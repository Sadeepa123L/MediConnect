export default function HeroSection() {
  return (
    <section id="home" className="relative bg-[#FBF6EF] py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#A8C4B0]/40 blur-0"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-32 -left-32 w-72 h-72 rounded-full bg-[#EF8354]/10"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 bg-white text-[#2A6B63] px-4 py-1.5 rounded-full text-sm font-medium border border-[#2A6B63]/15 mb-6">
          <i className="ti ti-ticket text-base" aria-hidden="true"></i>
          No accounts. No queues. Just a booking.
        </span>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#332B25] mb-6 tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Find and book your <span className="text-[#2A6B63] italic">doctor</span> in minutes
        </h1>
        <p className="text-lg text-[#5C5249] mb-10 max-w-2xl mx-auto leading-relaxed">
          Skip the long queues and the paperwork. Search for your doctor, pick a time that works, and you're booked — no account needed.
        </p>

        <div
          id="book"
          className="relative bg-white p-5 md:p-7 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.15)] max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-end"
        >
          <div
            className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FBF6EF]"
            aria-hidden="true"
          ></div>
          <div
            className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FBF6EF]"
            aria-hidden="true"
          ></div>

          <div className="w-full text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">Doctor or specialty</label>
            <input
              type="text"
              placeholder="e.g. Cardiologist or Dr. Nimal"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
            />
          </div>
          <div className="w-full md:w-60 text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">Date</label>
            <input
              type="date"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#5C5249]"
            />
          </div>
          <button className="w-full md:w-auto bg-[#EF8354] text-white px-8 py-3.5 rounded-2xl font-medium hover:bg-[#DD6E3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <i className="ti ti-search text-lg" aria-hidden="true"></i>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}