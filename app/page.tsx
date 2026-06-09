import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Products } from "@/components/products/Products";
import { KitBuilder } from "@/components/kit-builder/KitBuilder";
import { Reviews } from "@/components/reviews/Reviews";
import { Instagram } from "@/components/instagram/Instagram";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/contact/Footer";
import { WhatsAppFloat } from "@/components/contact/WhatsAppFloat";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CursorGlow } from "@/components/CursorGlow";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <KitBuilder />
        <Reviews />
        <Instagram />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </>
  );
}
