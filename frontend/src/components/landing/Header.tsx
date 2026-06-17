 import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <i className="ti ti-heartbeat text-[#185FA5] text-2xl" aria-hidden="true"></i>
            <span className="text-xl font-bold text-gray-900">MediCare</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-[#185FA5] font-medium transition-colors">Home</a>
            <a href="#about" className="text-gray-600 hover:text-[#185FA5] font-medium transition-colors">About Us</a>
            <a href="#services" className="text-gray-600 hover:text-[#185FA5] font-medium transition-colors">Services</a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Admin Login button eka methanin ain kala. */}
          <Link to="/book" className="bg-[#185FA5] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0C447C] transition-all shadow-sm">
           Book Appointment
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
}