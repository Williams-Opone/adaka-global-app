"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    inquiry_type: "EQUIPMENT SALES",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SENDING...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("MESSAGE SENT SUCCESSFULLY");
        setFormData({ full_name: "", email: "", inquiry_type: "EQUIPMENT SALES", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("FAILED TO SEND. TRY AGAIN.");
      }
    } catch (err) {
      setStatus("CONNECTION ERROR. CHECK SERVER.");
    }
  };

  return (
    <section className="bg-[#F0F4EF] overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: The "Picture-Full" Element */}
        <div className="lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-auto relative bg-[#0D1821]">
          <Image 
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200" 
            alt="Adaka Global Logistics"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-50 grayscale"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 z-10">
            <h2 className="font-heading text-5xl sm:text-6xl md:text-8xl text-white uppercase leading-none text-center lg:text-left">
              Let's<br />Build <br /> <span className="opacity-30 italic">Together.</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Quick Inquiry Form */}
        <div className="lg:w-1/2 p-8 sm:p-12 lg:p-24 text-[#0D1821]">
          <h3 className="font-heading text-3xl sm:text-4xl uppercase mb-8 md:mb-12">Direct Inquiry</h3>
          
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-2">
                <label className="font-heading text-[10px] uppercase opacity-40 tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="bg-transparent border-b border-[#0D1821]/20 py-2 focus:outline-none focus:border-[#0D1821] transition-all font-sans text-sm " 
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-heading text-[10px] uppercase opacity-40 tracking-widest">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-transparent border-b border-[#0D1821]/20 py-2 focus:outline-none focus:border-[#0D1821] transition-all font-sans text-sm " 
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-heading text-[10px] uppercase opacity-40 tracking-widest">Subject</label>
              <select 
                value={formData.inquiry_type}
                onChange={(e) => setFormData({...formData, inquiry_type: e.target.value})}
                className="bg-transparent border-b border-[#0D1821]/20 py-2 focus:outline-none focus:border-[#0D1821] transition-all appearance-none cursor-pointer font-heading text-lg uppercase"
              >
                <option value="EQUIPMENT SALES">EQUIPMENT SALES</option>
                <option value="MARINE SUPPORT">MARINE SUPPORT</option>
                <option value="MINERAL TRADING">MINERAL TRADING</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-heading text-[10px] uppercase opacity-40 tracking-widest">Message</label>
              <textarea 
                required
                rows={3} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-transparent border-b border-[#0D1821]/20 py-2 focus:outline-none focus:border-[#0D1821] transition-all resize-none font-sans text-sm " 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0D1821] text-[#F0F4EF] py-4 md:py-5 font-heading text-xl md:text-2xl uppercase hover:invert transition-all active:scale-[0.98]"
            >
              {status || "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}