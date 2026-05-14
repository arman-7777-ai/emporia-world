import { PROPERTIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/animations/MagneticButton";

import { motion } from "framer-motion";

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = PROPERTIES.find((p) => p.id.toString() === params.id);

  if (!property) {
    notFound();
  }

  return (
    <main className="bg-[#fafaf9] min-h-screen">
      <Header />
      
      {/* Dynamic Property Hero */}
      <section className="relative h-[80vh] w-full flex items-end pb-20">
        <div className="absolute inset-0">
          <img 
            src={property.image} 
            alt={property.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/80 to-transparent" />
        </div>
        
        <div className="container-luxury relative z-10 w-full">
          <div className="flex gap-4 mb-6">
            <span className="glass px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-[#0a0a0a] font-medium border border-black/5">
              {property.tag}
            </span>
            <span className="glass px-4 py-2 uppercase tracking-[0.2em] text-[10px] text-[#c9a96e] font-medium border border-black/5">
              {property.price}
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl text-[#0a0a0a] font-light mb-4 drop-shadow-sm">
            {property.name}
          </h1>
          <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-sm font-medium">
            {property.location}
          </p>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-32 container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="col-span-2">
            <h3 className="text-[#0a0a0a] text-3xl font-light mb-8 font-display">About the Residence</h3>
            <p className="text-gray-600 font-light leading-relaxed mb-6 text-lg">
              An architectural masterpiece redefining the skyline. This ultra-premium residence features 
              breathtaking panoramic views, state-of-the-art home automation, and bespoke interiors 
              crafted from the finest materials sourced globally.
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Experience unparalleled luxury with exclusive access to world-class amenities including 
              a private infinity pool, dedicated concierge service, and a private wellness sanctuary.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-10 border border-black/5">
            <h4 className="text-[#0a0a0a] text-sm tracking-[0.2em] uppercase mb-8 font-medium">Specifications</h4>
            <div className="space-y-6">
              <div className="flex justify-between border-b border-black/5 pb-4">
                <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Price</span>
                <span className="text-[#0a0a0a]">{property.price}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-4">
                <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Area</span>
                <span className="text-[#0a0a0a]">{property.specs.area}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-4">
                <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Bedrooms</span>
                <span className="text-[#0a0a0a]">{property.specs.beds}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-4">
                <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Bathrooms</span>
                <span className="text-[#0a0a0a]">{property.specs.baths}</span>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col gap-4">
              <motion.button whileTap={{ scale: 0.96 }} onClick={(e: any) => e.preventDefault()} className="w-full flex items-center justify-center bg-[#0a0a0a] text-white py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#c9a96e] transition-colors rounded-none">
                Inquire Now
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={(e: any) => e.preventDefault()} className="w-full flex items-center justify-center border border-black/10 text-[#0a0a0a] py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-gray-50 transition-colors rounded-none">
                Download Brochure
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
