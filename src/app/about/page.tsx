"use client";
import { motion } from "framer-motion";

const milestones = [
  { year: "2011", event: "Establishment of ADAKA GLOBAL EQUIP in Calgary, Canada." },
  { year: "2015", event: "Expansion into the Nigerian Oil & Gas and Maritime sectors." },
  { year: "2019", event: "Inauguration of the Process Control & Engineering division." },
  { year: "2024", event: "Launch of the Integrated Digital Inventory & Procurement platform." }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F0F4EF] pt-24 md:pt-32 pb-20 text-[#0D1821] overflow-x-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-20 md:mb-32 relative overflow-hidden"> {/* Added overflow-hidden */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-6xl sm:text-7xl md:text-[12rem] leading-[0.8] uppercase mb-12 z-10 relative"
          >
            Legacy <br /> <span className="opacity-20 italic">of Trust.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start z-10 relative">
            <div className="lg:col-span-5 aspect-[4/5] overflow-hidden bg-[#0D1821]/5 grayscale contrast-125 mb-8 lg:mb-0">
              <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Industrial Legacy" />
            </div>

            <div className="lg:col-span-7 space-y-8 md:space-y-12">
              <p className="font-sans text-2xl md:text-4xl leading-snug opacity-80 uppercase italic font-light">
                Since 2011, ADAKA GLOBAL EQUIP (A.G.E) has been a cornerstone in global industrial procurement and maritime support.
              </p>
              <div className="space-y-6 opacity-60 font-sans text-[10px] md:text-xs tracking-[0.2em] leading-loose uppercase max-w-xl">
                <p>
                  We provide professional and innovative services to the power, manufacturing, 
                  and telecommunication sectors, as well as government agencies. 
                </p>
                <p>
                  Our expertise spans engineering design, project management, facilities maintenance, 
                  and integrity management. We bridge the gap between global manufacturers 
                  and local industrial needs.
                </p>
              </div>
            </div>
          </div>
          
          {/* The Est. 2011 Stamp: Responsively Sized */}
          <span className="absolute bottom-0 right-0 md:-bottom-20 md:-right-10 font-heading text-[8rem] sm:text-[10rem] md:text-[15rem] opacity-[0.03] select-none pointer-events-none z-0">
            Est. 2011
          </span>
        </section>

        {/* --- FOUNDER & VALUES SECTION --- */}
        <section className="bg-[#0D1821] text-[#F0F4EF] p-8 sm:p-12 md:p-24 -mx-6 md:mx-0 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          <div className="flex-1 max-w-4xl space-y-8 md:space-y-12 order-2 lg:order-1">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.9] tracking-tighter">
              Built on <br /> <span className="opacity-30">Integrity Management.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60 leading-loose">
              <p>
                Safety is our highest standard. In the offshore and oil & gas sectors, 
                compliance isn't just a rule—it's the foundation of our technology and service.
              </p>
              <p>
                From Calgary to Nigeria, our mission remains to eliminate costs and delays 
                by providing local technical capacity and global equipment partnerships.
              </p>
            </div>
          </div>

          <div className="flex-none w-full lg:w-[400px] flex flex-col items-center gap-6 order-1 lg:order-2">
            <div className="w-full max-w-[300px] lg:max-w-md aspect-square overflow-hidden bg-primary/10  hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://res.cloudinary.com/dotcy7lhz/image/upload/v1776344139/mrdax_hpjvcb.jpg" 
                className="w-full h-full object-cover" 
                alt="Founder of Adaka Global Equip" 
              />
            </div>
            <div className="text-center">
              <h4 className="font-heading text-xl md:text-2xl uppercase tracking-widest text-white">Dax Oyibo</h4>
              <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-40">Founder / Lead Engineer</p>
            </div>
          </div>
        </section>

        {/* --- THE TIMELINE --- */}
        <section className="py-20 md:py-32 border-t border-[#0D1821]/10 mt-20 md:mt-32">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase mb-16 md:mb-24 leading-none">Global <br/> <span className="opacity-30">Milestones.</span></h2>
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {milestones.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0D1821]/10 pb-8 md:pb-12 group"
              >
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
                  <span className="font-heading text-xl md:text-3xl opacity-20 border border-current px-3 py-1">
                    0{i + 1}
                  </span>
                  <span className="font-heading text-5xl md:text-8xl opacity-10 group-hover:opacity-100 transition-opacity duration-500 tracking-tighter">
                    {m.year}
                  </span>
                </div>
                <p className="font-heading text-xl md:text-3xl max-w-xl uppercase group-hover:translate-x-0 md:group-hover:translate-x-4 transition-all leading-tight">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}