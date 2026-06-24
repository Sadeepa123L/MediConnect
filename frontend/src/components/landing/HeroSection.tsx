import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../../services/doctorService';
import type { Doctor } from '../../types/doctor';

export default function HeroSection() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedDoctors, setMatchedDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const handleSearch = () => {
    const trimmed = query.trim().toLowerCase();
    setHasSearched(true);

    if (!trimmed) {
      setMatchedDoctors([]);
      setShowResults(true);
      return;
    }

    const matches = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(trimmed) ||
        doc.specialty.toLowerCase().includes(trimmed)
    );

    setMatchedDoctors(matches);
    setShowResults(true);
  };

  const handleViewDoctor = (doctorId: string) => {
    setShowResults(false);
    navigate(`/book?doctorId=${doctorId}`);
  };

  const statusBadge = (isActive: boolean) =>
    isActive ? (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF3DE] text-[#3B6D11]">
        Available
      </span>
    ) : (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAEEDA] text-[#854F0B]">
        Unavailable
      </span>
    );

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. Cardiologist or Dr. Nimal"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
            />
          </div>
          <div className="w-full md:w-60 text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#5C5249]"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#EF8354] text-white px-8 py-3.5 rounded-2xl font-medium hover:bg-[#DD6E3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <i className="ti ti-search text-lg" aria-hidden="true"></i>
            Search
          </button>
        </div>
      </div>

      {showResults && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4"
          onClick={() => setShowResults(false)}
        >
          <div
            className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.25)] max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F4EDE1]">
              <h2 className="text-xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                {matchedDoctors.length > 0 ? `${matchedDoctors.length} doctor${matchedDoctors.length > 1 ? 's' : ''} found` : 'No doctors found'}
              </h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-[#A39A8C] hover:text-[#5C5249] p-1 transition-colors"
                aria-label="Close"
              >
                <i className="ti ti-x text-xl" aria-hidden="true"></i>
              </button>
            </div>

            <div className="p-6">
              {hasSearched && matchedDoctors.length === 0 && (
                <div className="text-center py-6">
                  <i className="ti ti-mood-sad text-3xl text-[#A39A8C] mb-2" aria-hidden="true"></i>
                  <p className="text-sm text-[#5C5249]">
                    No doctors match "{query}". Try a different name or specialty.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {matchedDoctors.map((doc) => (
                  <div
                    key={doc._id}
                    className="bg-[#F4EDE1] rounded-2xl p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#A8C4B0]/30 flex items-center justify-center shrink-0">
                        <i className="ti ti-stethoscope text-lg text-[#2A6B63]" aria-hidden="true"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#332B25] truncate">{doc.name}</p>
                        <p className="text-xs text-[#5C5249]">{doc.specialty}</p>
                        <div className="mt-1">{statusBadge(doc.isActive)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDoctor(doc._id)}
                      className="bg-[#2A6B63] text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#235953] transition-all shrink-0"
                    >
                      View doctor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}