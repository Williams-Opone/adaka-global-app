"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Import these

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password })
      });
  
      if (res.ok) {
        const data = await res.json();
        document.cookie = `admin_token=${data.token}; path=/; max-age=3600; SameSite=Strict`;
        router.push('/admin/leads');
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Cannot connect to server. Ensure Flask is running.");
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-6 bg-[#0D1821]">
      <div className="bg-[#F0F4EF] p-8 md:p-12 w-full max-w-sm md:max-w-md shadow-2xl">
        <h2 className="font-heading text-3xl md:text-4xl uppercase mb-8 text-[#0D1821]">
          Admin Access
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Email</label>
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none focus:border-[#0D1821] font-sans text-sm uppercase" 
              autoCapitalize="none"
              autoCorrect="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Password</label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} // Toggle type
                placeholder="ENTER PASSWORD" 
                className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none focus:border-[#0D1821] font-sans text-sm uppercase"
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
                required
              />
              <button 
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 opacity-40 hover:opacity-80 transition-opacity"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="w-full bg-[#0D1821] text-[#F0F4EF] py-4 md:py-5 font-heading text-lg md:text-xl uppercase hover:opacity-90 transition-all active:scale-[0.98]">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}