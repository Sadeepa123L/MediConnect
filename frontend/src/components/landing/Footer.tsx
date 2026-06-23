export default function Footer() {
  return (
    <footer className="bg-[#332B25] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#EF8354] flex items-center justify-center">
              <i className="ti ti-heartbeat text-white text-base" aria-hidden="true"></i>
            </div>
            <span className="text-xl font-semibold text-white" style={{ fontFamily: "'Fraunces', serif" }}>
              MediCare
            </span>
          </div>
          <p className="text-[#C9C0B3] text-sm leading-relaxed max-w-xs">
            Simplifying healthcare access for everyone. Book your doctor appointments instantly.
          </p>
        </div>
        <div>
          <h4 className="text-base font-medium mb-4 text-white">Quick links</h4>
          <ul className="space-y-2 text-sm text-[#C9C0B3]">
            <li><a href="#home" className="hover:text-[#EF8354] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[#EF8354] transition-colors">About us</a></li>
            <li><a href="#book" className="hover:text-[#EF8354] transition-colors">Book appointment</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-medium mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-[#C9C0B3]">
            <li className="flex items-center gap-2"><i className="ti ti-map-pin text-lg text-[#A8C4B0]" aria-hidden="true"></i> 123 Health Avenue, Colombo</li>
            <li className="flex items-center gap-2"><i className="ti ti-phone text-lg text-[#A8C4B0]" aria-hidden="true"></i> +94 11 234 5678</li>
            <li className="flex items-center gap-2"><i className="ti ti-mail text-lg text-[#A8C4B0]" aria-hidden="true"></i> support@medicare.lk</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-8 border-t border-white/10 text-center text-sm text-[#A89E91]">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </div>
    </footer>
  );
}