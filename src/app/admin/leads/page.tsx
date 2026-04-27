"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react"; // 1. Import Trash icon
import AdminNav from "@/components/layout/AdminNav"; 
import toast from "react-hot-toast"; // Ensure you have this for feedback

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setLeads(data); })
      .catch(err => console.error("Error fetching leads:", err))
      .finally(() => setLoading(false));
  };

  // 2. The Delete Function
  const deleteLead = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads/delete/${id}`, { 
        method: 'DELETE' 
      });
      if (res.ok) {
        setLeads(leads.filter(lead => lead.id !== id));
        toast.success("Lead deleted");
      } else {
        toast.error("Failed to delete lead");
      }
    } catch (err) {
      toast.error("Server connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4EF] text-[#0D1821]">
      <AdminNav />
      <main className="p-6 md:p-16 lg:p-24 pt-32">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 md:mb-16">
            <h1 className="font-heading text-5xl sm:text-7xl md:text-9xl uppercase leading-[0.8]">
              System <br /> <span className="opacity-20 text-3xl sm:text-5xl md:text-8xl">Leads.</span>
            </h1>
          </header>

          {loading ? (
            <div className="p-20 text-center opacity-30 font-heading text-2xl uppercase">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="p-20 text-center border-2 border-dashed border-[#0D1821]/10 rounded-lg">
              <h3 className="font-heading text-3xl uppercase opacity-40">No leads yet</h3>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block bg-white border border-[#0D1821]/10 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#0D1821] text-[#F0F4EF] font-heading text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Date</th>
                      <th className="p-6">Client Info</th>
                      <th className="p-6">Interest</th>
                      <th className="p-6">Message</th>
                      <th className="p-6">Action</th> {/* 3. New Column */}
                    </tr>
                  </thead>
                  <tbody className="font-sans text-sm uppercase">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-[#0D1821]/5 hover:bg-[#0D1821]/5">
                        <td className="p-6 opacity-60 tabular-nums">{lead.date}</td>
                        <td className="p-6">
                          <span className="font-bold block uppercase">{lead.full_name}</span>
                          <span className="text-[10px] opacity-60 block">{lead.email}</span>
                        </td>
                        <td className="p-6"><span className="bg-[#0D1821] text-[#F0F4EF] px-2 py-0.5 text-[10px]">{lead.type}</span></td>
                        <td className="p-6 max-w-sm truncate">{lead.message}</td>
                        <td className="p-6">
                          <button onClick={() => deleteLead(lead.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE LIST */}
              <div className="md:hidden space-y-4">
                {leads.map((lead) => (
                  <motion.div key={lead.id} className="bg-white p-6 border border-[#0D1821]/10 space-y-3 relative">
                    <button onClick={() => deleteLead(lead.id)} className="absolute top-4 right-4 text-red-500">
                      <Trash2 size={16} />
                    </button>
                    <h4 className="font-bold uppercase">{lead.full_name}</h4>
                    <p className="text-xs italic opacity-70">"{lead.message}"</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}