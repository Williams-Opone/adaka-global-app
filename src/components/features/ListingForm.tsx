export default function ListingForm() {
    return (
      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Submit a Listing</h3>
          <p className="text-slate-500 mb-8 italic text-sm">One of our representative will be with you shortly.</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full p-3 border border-slate-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
              <input type="text" placeholder="Company" className="w-full p-3 border border-slate-200 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
  
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 font-bold cursor-pointer">
                <input type="radio" name="deal" value="sell" className="w-4 h-4 accent-orange-500" />
                <span>Sell</span>
              </label>
              <label className="flex items-center space-x-2 font-bold cursor-pointer">
                <input type="radio" name="deal" value="lease" className="w-4 h-4 accent-orange-500" />
                <span>Lease</span>
              </label>
            </div>
  
            <select className="w-full p-3 border border-slate-200 rounded font-medium">
              <option>Select class of equipment</option>
              <option>ABS Barge</option>
              <option>Crane Barge</option>
              <option>Push Boat</option>
            </select>
  
            <textarea placeholder="Describe your equipment" className="w-full p-3 border border-slate-200 rounded h-32" />
            
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-orange-600 transition shadow-lg">
              SUBMIT LISTING
            </button>
          </form>
        </div>
      </section>
    );
  }