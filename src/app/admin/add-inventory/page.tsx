"use client";
import { useState, useEffect } from "react";
import { Upload, X, Trash2 } from "lucide-react";
import AdminNav from "@/components/layout/AdminNav";
import toast from "react-hot-toast";

export default function AddInventory() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "EQUIPMENT",
    location: "",
    price: "",
    description: ""
  });

  // Fetch current inventory on load
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/inventory/all')
      .then(res => res.json())
      .then(data => setInventory(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      setPreviews((prev) => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // 2. Add a loading state
  
    const toastId = toast.loading("Publishing asset...");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((file) => data.append('images', file));

    try {
      const res = await fetch('http://127.0.0.1:5000/api/inventory/add', { method: 'POST', body: data });
        if (res.ok) {
          toast.success("Asset published successfully!", { id: toastId });
        // Reset form...
      } else {
        toast.error("Failed to post asset.", { id: toastId });
      }
    } catch (err) {
      toast.error("Server connection failed.", { id: toastId });
    } finally {
      setIsSubmitting(false); // 3. Turn off loading
    }
  };

  const deleteAsset = async (id: number) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    await fetch(`http://127.0.0.1:5000/api/inventory/delete/${id}`, { method: 'DELETE' });
    setInventory(inventory.filter((i: any) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F0F4EF] pt-24 md:pt-32 pb-20 text-[#0D1821]">
      <AdminNav />
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase mb-12">
          Post <span className="opacity-30">New Asset.</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-24">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Asset Name</label>
              <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none cursor-pointer">
                  <option value="EQUIPMENT">EQUIPMENT</option><option value="CAR SALES">CAR SALES</option>
                  <option value="MINERALS">MINERALS</option><option value="FARM PRODUCE">FARM PRODUCE</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Location</label>
                <input name="location" value={formData.location} onChange={handleInputChange} type="text" className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none" required />
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Price</label>
              <input name="price" value={formData.price} onChange={handleInputChange} type="number" className="w-full bg-transparent border-b border-[#0D1821]/20 py-3 focus:outline-none" />
            </div>
            <div className="space-y-3">
              <label className="font-heading text-[10px] uppercase tracking-widest opacity-40">Technical Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={5} className="w-full bg-transparent border border-[#0D1821]/10 p-4 focus:outline-none" />
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full bg-[#0D1821] text-[#F0F4EF] py-5 font-heading text-xl uppercase hover:invert disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Listing"}
            </button>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <label className="font-heading text-[10px] uppercase tracking-widest opacity-40 block">Asset Gallery</label>
            <label className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-dashed border-[#0D1821]/20 cursor-pointer hover:bg-[#0D1821]/5">
              <Upload size={32} className="mb-4 opacity-20" />
              <input type="file" className="hidden" multiple onChange={handleImageChange} />
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {previews.map((src, index) => (
                <div key={index} className="relative aspect-video bg-[#0D1821]">
                  <img src={src} className="w-full h-full object-cover opacity-80" alt="Preview" />
                  <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* MANAGE ASSETS SECTION */}
        <h2 className="font-heading text-3xl uppercase mb-8">Manage <span className="opacity-30">Assets</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inventory.map((item: any) => (
            <div key={item.id} className="bg-white border border-[#0D1821]/10 p-4">
              <img src={item.image_url} className="w-full h-40 object-cover mb-4" />
              <h3 className="font-heading uppercase text-lg">{item.name}</h3>
              <p className="text-sm opacity-60 mb-4">${item.price}</p>
              <button onClick={() => deleteAsset(item.id)} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 text-[10px] uppercase font-heading tracking-widest hover:bg-red-500 hover:text-white">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}