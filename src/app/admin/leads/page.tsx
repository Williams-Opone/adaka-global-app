"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminNav from "@/components/layout/AdminNav"; 

interface Lead {
  id: number | string;
  date: string;
  full_name: string;
  email: string;     
  phone_number?: string; 
  company?: string;
  type: string;
  message: string;
  categories?: string;
}

export default function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setLeads(data); })
      .catch(err => console.error("Error fetching leads:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4EF] text-[#0D1821]">
      <AdminNav />

      <main className="p-6 md:p-16 lg:p-24 pt-32">
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-12 md:mb-16">
            <h1 className="font-heading text-5xl sm:text-7xl md:text-9xl uppercase leading-[0.8]">
              System <br /> <span className="opacity-20 text-3xl sm:text-5xl md:text-8xl">Leads.</span>
            </h1>
            <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] opacity-40 mt-6">
              ADAKA GLOBAL / Client Inquiry Database
            </p>
          </header>

          {/* DESKTOP TABLE: Hidden on mobile, shown on md+ */}
          <div className="hidden md:block bg-white border border-[#0D1821]/10 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#0D1821] text-[#F0F4EF] font-heading text-xs uppercase tracking-widest">
              <tr>
                <th className="p-6">Date</th>
                <th className="p-6">Client Info</th>
                <th className="p-6">Interest</th>
                <th className="p-6">Message</th>
              </tr>
              </thead>
              <tbody className="font-sans text-sm uppercase">
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#0D1821]/5 hover:bg-[#0D1821]/5">
                    <td className="p-6 opacity-60 tabular-nums">{lead.date}</td>
                    <td className="p-6">
                      <span className="font-bold block uppercase">{lead.full_name}</span>
                      <span className="text-[10px] opacity-60 block">{lead.email}</span>
                      <span className="text-[10px] opacity-60 block">{lead.phone_number || "NO PHONE"}</span>
                      <span className="text-[10px] opacity-40 italic">{lead.company || "Independent"}</span>
                    </td>
                    <td className="p-6"><span className="bg-[#0D1821] text-[#F0F4EF] px-2 py-0.5 text-[10px] uppercase">{lead.type}</span></td>
                    <td className="p-6 max-w-sm"><p className="truncate font-medium">{lead.message}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST: Shown only on mobile */}
          <div className="md:hidden space-y-4">
            <AnimatePresence>
              {leads.map((lead) => (
                <motion.div 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 border border-[#0D1821]/10 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-heading text-xs opacity-40">{lead.date}</span>
                    <span className="bg-[#0D1821] text-[#F0F4EF] px-2 py-0.5 text-[9px]">{lead.type}</span>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase">{lead.full_name}</h4>
                    <p className="text-[10px] opacity-40">{lead.company || "Independent"}</p>
                  </div>
                  <p className="text-xs italic opacity-70 border-t border-[#0D1821]/5 pt-3 mt-2">"{lead.message}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {leads.length === 0 && (
            <div className="p-20 text-center opacity-30 font-heading text-xl uppercase">No Leads Found</div>
          )}
        </div>
      </main>
    </div>
  );
}