import Navbar from "@/components/Navbar";
import QuienesSomos from "@/components/QuienesSomos";
import Footer from "@/components/Footer";

export default function Nosotros() {
  return (
    <>
      <Navbar />
      <main className="pt-14 lg:pt-18">
        <QuienesSomos />
      </main>
      <Footer />
    </>
  );
}
