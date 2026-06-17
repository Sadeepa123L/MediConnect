
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <i className="ti ti-heartbeat text-[#E6F1FB] text-2xl" aria-hidden="true"></i>
            <span className="text-xl font-bold text-white">MediCare</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Simplifying healthcare access for everyone. Book your doctor appointments instantly.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#book" className="hover:text-white transition-colors">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2"><i className="ti ti-map-pin text-lg"></i> 123 Health Avenue, Colombo</li>
            <li className="flex items-center gap-2"><i className="ti ti-phone text-lg"></i> +94 11 234 5678</li>
            <li className="flex items-center gap-2"><i className="ti ti-mail text-lg"></i> support@medicare.lk</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </div>
    </footer>
  );
}