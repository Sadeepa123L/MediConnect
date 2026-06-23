import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#FBF6EF]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#2A6B63] flex items-center justify-center">
              <i className="ti ti-heartbeat text-[#FBF6EF] text-lg" aria-hidden="true"></i>
            </div>
            <span className="text-xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
              MediCare
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[#5C5249] hover:text-[#2A6B63] font-medium transition-colors text-[15px]">Home</a>
            <a href="#about" className="text-[#5C5249] hover:text-[#2A6B63] font-medium transition-colors text-[15px]">About us</a>
            <a href="#services" className="text-[#5C5249] hover:text-[#2A6B63] font-medium transition-colors text-[15px]">Services</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/book"
              className="bg-[#EF8354] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#DD6E3D] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Book appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}