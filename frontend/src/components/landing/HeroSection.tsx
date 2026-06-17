export default function HeroSection() {
  return (
    <section id="home" className="bg-white py-20 lg:py-32 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Find and Book Your <span className="text-[#185FA5]">Doctor</span> Easily
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          No need to wait in long queues or create accounts. Just search for your preferred doctor, pick a date, and confirm your appointment in minutes.
        </p>
        <div id="book" className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name or Specialty</label>
            <input 
              type="text" 
              placeholder="e.g. Cardiologist or Dr. Nimal" 
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] transition-all"
            />
          </div>
          <div className="w-full md:w-64 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] transition-all text-gray-600"
            />
          </div>
          <button className="w-full md:w-auto bg-[#185FA5] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0C447C] transition-all shadow-md flex items-center justify-center gap-2">
            <i className="ti ti-search text-lg"></i>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}