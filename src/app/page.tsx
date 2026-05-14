import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Showcase from "@/components/Showcase";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#fafaf9] min-h-screen">
      <Header />
      <Hero />
      <Philosophy />
      <Showcase />
      <BookingCTA />
      <Footer />
    </main>
  );
}
