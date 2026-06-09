// Optimizes the raw 3D source files in assets-src/ into web-ready GLBs in
// public/assets/. The sources are pure, non-indexed, massively over-tessellated
// geometry (no textures). Pipeline per file:
//   1. strip per-vertex NORMAL + unused TEXCOORD_0 (no textures use UVs)
//   2. weld  -> merges coincident positions, connecting the topology
//   3. simplify (meshoptimizer) -> drastically cuts triangle count
//   4. normals -> regenerate smooth shading normals for lighting
//   5. prune + dedup -> cleanup
//   6. Draco compression on write (drei's useGLTF decodes Draco by default)
//
// Run: npm run optimize:assets   (requires the raw files in assets-src/)
import fs from "node:fs";
import { NodeIO } from "@gltf-transform/core";
import { KHRDracoMeshCompression } from "@gltf-transform/extensions";
import { weld, simplify, normals, prune, dedup } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3dgltf";

const TARGETS = [
  { in: "assets-src/logo.glb", out: "public/assets/logo.glb", ratio: 0.08, error: 0.01 },
  { in: "assets-src/mascote.glb", out: "public/assets/mascote.glb", ratio: 0.12, error: 0.008 },
];

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    "draco3d.encoder": await draco3d.createEncoderModule(),
    "draco3d.decoder": await draco3d.createDecoderModule(),
  });

await MeshoptSimplifier.ready;

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";
const countTris = (doc) => {
  let tris = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const idx = prim.getIndices();
      const pos = prim.getAttribute("POSITION");
      tris += (idx ? idx.getCount() : pos ? pos.getCount() : 0) / 3;
    }
  }
  return Math.round(tris);
};

for (const t of TARGETS) {
  if (!fs.existsSync(t.in)) {
    console.warn(`skip: ${t.in} not found`);
    continue;
  }
  const doc = await io.read(t.in);

  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      prim.setAttribute("NORMAL", null);
      prim.setAttribute("TEXCOORD_0", null);
    }
  }
  const trisBefore = countTris(doc);

  await doc.transform(
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: t.ratio, error: t.error }),
    normals({ overwrite: true }),
    weld(), // re-index after normals so Draco (indexed-only) can compress
    prune(),
    dedup(),
  );
  const trisAfter = countTris(doc);

  doc.createExtension(KHRDracoMeshCompression).setRequired(true);
  fs.mkdirSync(t.out.replace(/\/[^/]+$/, ""), { recursive: true });
  await io.write(t.out, doc);

  console.log(
    `${t.in} -> ${t.out}\n  ${mb(fs.statSync(t.in).size)} -> ${mb(
      fs.statSync(t.out).size,
    )} | triangles ${trisBefore.toLocaleString()} -> ${trisAfter.toLocaleString()}`,
  );
}
