import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Showcase from "@/components/Showcase";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#ffffff] dark:bg-[#030303] min-h-screen transition-colors duration-700">
      <Header />
      <Hero />
      <Philosophy />
      <Showcase />
      <BookingCTA />
      <Footer />
    </main>
  );
}
