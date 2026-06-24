import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAppointmentByNumber } from '../../services/appoinmentService';
import type { Appointment } from '../../types/appointment';

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New state for hamburger menu

  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [result, setResult] = useState<Appointment | null>(null);

  const steps = [
    {
      icon: 'ti ti-calendar-plus',
      title: 'Book your appointment',
      description: 'Pick a doctor, choose a date and time, and enter your contact details — no account needed.',
    },
    {
      icon: 'ti ti-clock-hour-4',
      title: 'Wait for confirmation',
      description: 'Our admin team reviews and confirms your slot. You\'ll get an email once it\'s confirmed.',
    },
    {
      icon: 'ti ti-mail-opened',
      title: 'Check your email',
      description: 'The confirmation email includes your unique appointment number — keep it handy.',
    },
    {
      icon: 'ti ti-search',
      title: 'Search anytime',
      description: 'Use your appointment number above to look up your booking details whenever you need to.',
    },
  ];

  const statusStyles: Record<string, string> = {
    Pending: 'bg-[#FAEEDA] text-[#854F0B]',
    Confirmed: 'bg-[#EAF3DE] text-[#3B6D11]',
    Cancelled: 'bg-[#FCEBEB] text-[#A32D2D]',
  };

  const closeSearch = () => {
    setShowSearch(false);
    setAppointmentNumber('');
    setSearchError('');
    setResult(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentNumber.trim()) return;

    setSearching(true);
    setSearchError('');
    setResult(null);

    try {
      const appointment = await getAppointmentByNumber(appointmentNumber.trim());
      setResult(appointment);
    } catch (error) {
      setSearchError('No appointment found with that number. Please check and try again.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
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

            <div className="flex items-center gap-2 sm:gap-2">
              {/* Desktop Only Buttons */}
              <button
                onClick={() => setShowSearch(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-[#5C5249] hover:text-[#2A6B63] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <i className="ti ti-search text-base" aria-hidden="true"></i>
                My appointment
              </button>
              
              <button
                onClick={() => setShowHelp(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-[#5C5249] hover:text-[#2A6B63] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <i className="ti ti-help-circle text-base" aria-hidden="true"></i>
                Help
              </button>

              {/* Book Appointment - Always Visible */}
              <Link
                to="/book"
                className="bg-[#EF8354] text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#DD6E3D] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
              >
                Book appointment
              </Link>

              {/* Mobile Hamburger Menu Container */}
              <div className="relative sm:hidden ml-1">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="text-[#5C5249] hover:text-[#2A6B63] p-2 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Toggle menu"
                  aria-expanded={showMobileMenu}
                >
                  <i className={`ti ${showMobileMenu ? 'ti-x' : 'ti-menu-2'} text-2xl`} aria-hidden="true"></i>
                </button>

                {/* Mobile Dropdown */}
                {showMobileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowMobileMenu(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(51,43,37,0.2)] py-2 border border-[#F4EDE1] z-50">
                      <button
                        onClick={() => {
                          setShowSearch(true);
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-5 py-3 text-[15px] font-medium text-[#5C5249] hover:text-[#2A6B63] hover:bg-[#FBF6EF] transition-colors flex items-center gap-3"
                      >
                        <i className="ti ti-search text-lg" aria-hidden="true"></i>
                        My appointment
                      </button>
                      <button
                        onClick={() => {
                          setShowHelp(true);
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-5 py-3 text-[15px] font-medium text-[#5C5249] hover:text-[#2A6B63] hover:bg-[#FBF6EF] transition-colors flex items-center gap-3"
                      >
                        <i className="ti ti-help-circle text-lg" aria-hidden="true"></i>
                        Help
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4" onClick={() => setShowHelp(false)}>
          <div
            className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.25)] max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F4EDE1]">
              <h2 className="text-xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                How booking works
              </h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-[#A39A8C] hover:text-[#5C5249] p-1 transition-colors"
                aria-label="Close"
              >
                <i className="ti ti-x text-xl" aria-hidden="true"></i>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#A8C4B0]/30 flex items-center justify-center shrink-0">
                      <i className={`${step.icon} text-lg text-[#2A6B63]`} aria-hidden="true"></i>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px flex-1 bg-[#E8DFD0] my-1"></div>
                    )}
                  </div>
                  <div className="pb-1">
                    <h3 className="text-sm font-medium text-[#332B25] mb-1">{step.title}</h3>
                    <p className="text-sm text-[#5C5249] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}

              <div className="bg-[#A8C4B0]/20 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <i className="ti ti-bulb text-[#2A6B63] text-lg shrink-0 mt-0.5" aria-hidden="true"></i>
                <p className="text-sm text-[#235953] leading-relaxed">
                  Already have your appointment number? Click <strong>"My appointment"</strong> in the header to look it up.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSearch && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4" onClick={closeSearch}>
          <div
            className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.25)] max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="text-xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                Find my appointment
              </h2>
              <button
                onClick={closeSearch}
                className="text-[#A39A8C] hover:text-[#5C5249] p-1 transition-colors"
                aria-label="Close"
              >
                <i className="ti ti-x text-xl" aria-hidden="true"></i>
              </button>
            </div>

            <div className="px-6 pb-6">
              <p className="text-sm text-[#5C5249] mb-4 leading-relaxed">
                Enter the appointment number from your confirmation email.
              </p>

              <form onSubmit={handleSearch} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={appointmentNumber}
                  onChange={(e) => setAppointmentNumber(e.target.value)}
                  placeholder="e.g. APT-0001"
                  className="flex-1 p-3 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] placeholder:text-[#A39A8C] transition-all"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="bg-[#2A6B63] text-white px-4 rounded-2xl font-medium hover:bg-[#235953] transition-all disabled:opacity-60 flex items-center justify-center shrink-0"
                >
                  {searching ? (
                    <i className="ti ti-loader-2 animate-spin text-lg" aria-hidden="true"></i>
                  ) : (
                    <i className="ti ti-search text-lg" aria-hidden="true"></i>
                  )}
                </button>
              </form>

              {searchError && (
                <p className="text-sm text-[#C2553D] bg-[#F9E4DC] py-2.5 px-3.5 rounded-xl mt-3">
                  {searchError}
                </p>
              )}

              {result && (
                <div className="relative bg-[#F4EDE1] rounded-2xl p-5 mt-4 space-y-2.5 text-sm overflow-hidden">
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-3 bg-white"
                    style={{
                      maskImage: 'radial-gradient(circle at 8px 0, transparent 6px, black 6.5px)',
                      maskSize: '16px 100%',
                      maskRepeat: 'repeat-x',
                    }}
                    aria-hidden="true"
                  ></div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8A8074]">Status</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyles[result.status] || 'bg-gray-100 text-gray-600'}`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Appointment no</span> <span className="font-semibold text-[#2A6B63]">{result.appointmentNumber}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Patient</span> <span className="font-medium text-[#332B25]">{result.patientName}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Doctor</span> <span className="font-medium text-[#332B25]">{result.doctorName}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Date & time</span> <span className="font-medium text-[#332B25]">{result.date} | {result.timeSlot}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}