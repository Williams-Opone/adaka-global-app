"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "", 
    company: "",
    inquiry_type: "GENERAL INQUIRY",
    message: "",
    equipment_categories: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Sending inquiry...");
  
    try {
      const payload = {
        ...formData,
        equipment_categories: formData.equipment_categories.join(", ")
      };
  
      const res = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      // Check if the response is JSON before parsing
      const data = await res.json().catch(() => ({})); 
  
      if (res.ok) {
        toast.success("Inquiry submitted successfully!", { id: toastId });
        setFormData({
          full_name: "", email: "", phone_number: "", company: "",
          inquiry_type: "GENERAL INQUIRY", message: "", equipment_categories: [],
        });
      } else {
        throw new Error(data.message || "Server rejected the request");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Server unreachable. Check if Flask is running on port 5000.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckbox = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      equipment_categories: prev.equipment_categories.includes(cat)
        ? prev.equipment_categories.filter((c) => c !== cat)
        : [...prev.equipment_categories, cat],
    }));
  };

  return (
    <div className="min-h-screen bg-secondary pt-24 md:pt-32 pb-20 text-primary">
      <div className="container mx-auto px-6">
        {/* Header: Scaled for mobile */}
        <div className="max-w-4xl mb-12 md:mb-20">
          <h1 className="font-heading text-6xl sm:text-7xl md:text-9xl uppercase leading-none">
            Get in <br /> <span className="opacity-30">Touch.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          
          {/* Left Side: Info & Visual */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <MapPin className="mt-1 opacity-40 shrink-0" />
                <div>
                  <h4 className="font-heading text-lg uppercase mb-1">Calgary HQ</h4>
                  <p className="font-sans text-xs opacity-60 leading-relaxed uppercase">
                    65 Falbury Crest NE<br />Calgary, AB T3J 1H8, Canada
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Phone className="opacity-40 shrink-0" />
                <div>
                  <h4 className="font-heading text-lg uppercase mb-1">Direct Line</h4>
                  <p className="font-sans text-xs opacity-60">+1 825-760-4125</p>
                </div>
              </div>
            </div>

            {/* Picture-Full Anchor */}
            <div className="aspect-square w-full border border-primary/10 overflow-hidden">
              <iframe
                className="w-full h-full  contrast-125"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBKgjJqFCxEq2L2efT1JfSG2NcL9ncOeO0&q=65+Falbury+Crescent+NE,Calgary,AB`}
              ></iframe>
            </div>
          </div>

          {/* Right Side: Form */}
          {/* Right Side: Form */}

          <div className="lg:col-span-7 bg-primary text-secondary p-10 md:p-16">

            <h3 className="font-heading text-4xl uppercase mb-12">Submit Listing / Inquiry</h3>

            

            {/* 4. Add onSubmit here */}

            <form className="space-y-10" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <input 

                  required

                  type="text" 

                  placeholder="FULL NAME" 

                  className="bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-sans text-sm uppercase"

                  value={formData.full_name}

                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}

                />

                <input 

                  required

                  type="email" 

                  placeholder="EMAIL ADDRESS" 

                  className="bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-sans text-sm uppercase"

                  value={formData.email}

                  onChange={(e) => setFormData({...formData, email: e.target.value})}

                />

                <input 
                  required
                  type="tel" 
                  placeholder="PHONE NUMBER" 
                  className="bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-sans text-sm uppercase"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                />

              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <select 

                  className="bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-heading text-xl uppercase cursor-pointer"

                  value={formData.inquiry_type}

                  onChange={(e) => setFormData({...formData, inquiry_type: e.target.value})}

                >

                  <option className="bg-primary" value="GENERAL INQUIRY">GENERAL INQUIRY</option>

                  <option className="bg-primary" value="SELL EQUIPMENT">SELL EQUIPMENT</option>

                  <option className="bg-primary" value="LEASE EQUIPMENT">LEASE EQUIPMENT</option>

                  <option className="bg-primary" value="MINERAL TRADING">MINERAL TRADING</option>

                </select>

                <input 

                  type="text" 

                  placeholder="COMPANY (OPTIONAL)" 

                  className="bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-sans text-sm uppercase"

                  value={formData.company}

                  onChange={(e) => setFormData({...formData, company: e.target.value})}

                />

              </div>



              <div className="space-y-4">

                <p className="font-heading text-xs uppercase opacity-40 tracking-widest">Equipment Category</p>

                <div className="flex flex-wrap gap-4 text-[10px]">

                  {["ABS Barge", "Dredge", "Crane", "Supply Boat", "Other"].map((cat) => (

                    <label key={cat} className={`flex items-center space-x-2 border border-secondary/20 px-4 py-2 hover:bg-secondary/10 cursor-pointer transition ${formData.equipment_categories.includes(cat) ? 'bg-secondary/20 border-secondary' : ''}`}>

                      <input 

                        type="checkbox" 

                        className="accent-secondary" 

                        checked={formData.equipment_categories.includes(cat)}

                        onChange={() => handleCheckbox(cat)}

                      />

                      <span className="uppercase font-sans">{cat}</span>

                    </label>

                  ))}

                </div>

              </div>



              <textarea 

                required

                placeholder="DESCRIBE YOUR EQUIPMENT OR REQUIREMENT" 

                rows={4} 

                className="w-full bg-transparent border-b border-secondary/20 py-3 focus:outline-none focus:border-secondary font-sans text-sm uppercase resize-none"

                value={formData.message}

                onChange={(e) => setFormData({...formData, message: e.target.value})}

              />



              <button 

                disabled={isSubmitting}

                className="w-full bg-secondary text-primary py-5 font-heading text-2xl uppercase hover:invert transition-all flex items-center justify-center space-x-4 disabled:opacity-50"

              >

                <span>{isSubmitting ? "Sending..." : "Submit to A.G.E"}</span>

                <Send size={20} />

              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}