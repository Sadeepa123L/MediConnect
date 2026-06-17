import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Mock Data - Backend eka connect කරනකම් පාවිච්චි කරන්න
const MOCK_DOCTORS = [
  { id: 'doc1', name: 'Dr. Nimal Siripala', specialty: 'Cardiologist' },
  { id: 'doc2', name: 'Dr. Priyantha Perera', specialty: 'Pediatrician' },
  { id: 'doc3', name: 'Dr. K. Sujeewa', specialty: 'Dermatologist' },
];

const AVAILABLE_SLOTS = ['04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM'];

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State - Schema එකේ fields වලට සමානයි
  const [formData, setFormData] = useState({
    doctorId: '',
    doctorName: '',
    doctorSpecialty: '',
    date: '',
    timeSlot: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: ''
  });

  const [successBookingNumber, setSuccessBookingNumber] = useState<string | null>(null);

  // Input change handle කිරීම
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Doctor කෙනෙක් තෝරද්දි නම සහ Specialty එක auto set කරගැනීම
  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoc = MOCK_DOCTORS.find(doc => doc.id === e.target.value);
    if (selectedDoc) {
      setFormData(prev => ({
        ...prev,
        doctorId: selectedDoc.id,
        doctorName: selectedDoc.name,
        doctorSpecialty: selectedDoc.specialty
      }));
    }
  };

  // Step 1 ඉවර වෙලා Step 2 වලට යන්න කලින් validation
  const handleNextStep = () => {
    if (!formData.doctorId || !formData.date || !formData.timeSlot) {
      alert('Please fill all fields to proceed!');
      return;
    }
    setStep(2);
  };

  // Final Form Submit (Database එකට Save කරන තැන)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API Call එක මෙතනට එන්න ඕනේ (POST /api/appointments)
    // body: formData
    console.log('Sending to Backend:', formData);

    // Mock Response - Oyaage schema pre-save code එකට ගැලපෙන්න හැදුවේ
    const mockNumber = `APT-${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`;
    setSuccessBookingNumber(mockNumber);
    setStep(3); // Success Screen
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Mini Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <i className="ti ti-heartbeat text-[#185FA5] text-2xl"></i>
            <span>MediCare</span>
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            <i className="ti ti-arrow-left"></i> Back to Home
          </Link>
        </div>
      </header>

      {/* Booking Form Card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-xl w-full overflow-hidden">
          
          {/* Step Progress Bar Indicators (UX වලට ගොඩක් වටිනවා) */}
          {step <= 2 && (
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-[#185FA5] text-white' : 'bg-green-500 text-white'}`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span className={`text-sm font-medium ${step === 1 ? 'text-gray-950' : 'text-gray-400'}`}>Select Doctor & Time</span>
              </div>
              <div className="h-[2px] bg-gray-200 flex-grow mx-4"></div>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[#185FA5] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </span>
                <span className={`text-sm font-medium ${step === 2 ? 'text-gray-950' : 'text-gray-400'}`}>Patient Information</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {/* STEP 1: DOCTOR & TIME SELECTION */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Find Your Schedule</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor & Specialty</label>
                  <select 
                    name="doctorId" 
                    value={formData.doctorId} 
                    onChange={handleDoctorChange}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-gray-700 bg-white"
                  >
                    <option value="">-- Choose a Doctor --</option>
                    {MOCK_DOCTORS.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slot</label>
                  <select 
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-gray-700 bg-white"
                  >
                    <option value="">-- Choose a Time --</option>
                    {AVAILABLE_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="w-full mt-4 bg-[#185FA5] text-white py-3 rounded-lg font-medium hover:bg-[#0C447C] transition-all flex items-center justify-center gap-2"
                >
                  Continue to Details <i className="ti ti-arrow-right"></i>
                </button>
              </div>
            )}

            {/* STEP 2: PATIENT DETAILS */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Patient Information</h2>
                  <span className="text-xs bg-blue-50 text-[#185FA5] px-2 py-1 rounded font-medium">
                    {formData.doctorName}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="patientEmail"
                      required
                      value={formData.patientEmail}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="patientPhone"
                      required
                      value={formData.patientPhone}
                      onChange={handleChange}
                      placeholder="0771234567"
                      className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms / Notes (Optional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Briefly describe your condition..."
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="w-2/3 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Confirm Appointment <i className="ti ti-check"></i>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION */}
            {step === 3 && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
                  ✓
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                  <p className="text-sm text-gray-500 mt-1">Your appointment request has been placed successfully.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 max-w-sm mx-auto space-y-2 text-left text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Appointment No:</span> <span className="font-bold text-[#185FA5]">{successBookingNumber}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Doctor:</span> <span className="font-semibold text-gray-800">{formData.doctorName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Date & Time:</span> <span className="font-semibold text-gray-800">{formData.date} | {formData.timeSlot}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Patient:</span> <span className="font-semibold text-gray-800">{formData.patientName}</span></div>
                </div>

                <p className="text-xs text-amber-600 bg-amber-50 py-2 px-3 rounded-lg inline-block">
                  ⚠️ Status is pending. Admin will confirm your slot via phone or email.
                </p>

                <button 
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all block text-center"
                >
                  Go back to Homepage
                </button>
              </div>
            )}

          </form>
        </div>
      </main>
    </div>
  );
}