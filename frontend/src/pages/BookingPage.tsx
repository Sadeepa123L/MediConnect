import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getAllDoctors } from '../services/doctorService';
import { bookAppointment } from '../services/appoinmentService';
import type { Doctor } from '../types/doctor';

const generateTimeSlots = (start: string, end: string): string[] => {
  const slots: string[] = [];

  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  while (current < endTime) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + 30);
    const slotEnd = new Date(current);

    if (slotEnd > endTime) break;

    const formatTime = (date: Date) =>
      date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    slots.push(`${formatTime(slotStart)} - ${formatTime(slotEnd)}`);
  }

  return slots;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length === 0) return;

    const preselectedId = searchParams.get('doctorId');
    if (!preselectedId) return;

    const preselectedDoc = doctors.find(doc => doc._id === preselectedId);
    if (!preselectedDoc) return;

    setFormData(prev => ({
      ...prev,
      doctorId: preselectedDoc._id,
      doctorName: preselectedDoc.name,
      doctorSpecialty: preselectedDoc.specialty,
      timeSlot: '',
    }));

    const slots = generateTimeSlots(
      preselectedDoc.availableTime.start,
      preselectedDoc.availableTime.end
    );
    setTimeSlots(slots);
  }, [doctors, searchParams]);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoc = doctors.find(doc => doc._id === e.target.value);
    if (selectedDoc) {
      setFormData(prev => ({
        ...prev,
        doctorId: selectedDoc._id,
        doctorName: selectedDoc.name,
        doctorSpecialty: selectedDoc.specialty,
        timeSlot: '',
      }));

      const slots = generateTimeSlots(
        selectedDoc.availableTime.start,
        selectedDoc.availableTime.end
      );
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
      setFormData(prev => ({
        ...prev,
        doctorId: '',
        doctorName: '',
        doctorSpecialty: '',
        timeSlot: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (!formData.doctorId || !formData.date || !formData.timeSlot) {
      alert('Please fill all fields to proceed!');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      setSubmitting(true);

      const result = await bookAppointment({
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        doctorId: formData.doctorId,
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: formData.notes,
      });

      setSuccessBookingNumber(result.appointmentNumber);
      setStep(3);
    } catch (error) {
      console.error('Failed to book appointment:', error);
      setErrorMessage('Something went wrong while booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const selectedDoctor = doctors.find(d => d._id === formData.doctorId);

  return (
    <div className="min-h-screen bg-[#FBF6EF] flex flex-col font-sans">
      <header className="bg-[#FBF6EF]/90 backdrop-blur-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
            <div className="w-8 h-8 rounded-full bg-[#2A6B63] flex items-center justify-center">
              <i className="ti ti-heartbeat text-[#FBF6EF] text-base" aria-hidden="true"></i>
            </div>
            <span>MediCare</span>
          </Link>
          <Link to="/" className="text-sm text-[#5C5249] hover:text-[#2A6B63] flex items-center gap-1 transition-colors">
            <i className="ti ti-arrow-left" aria-hidden="true"></i> Back to home
          </Link>
        </div>
      </header>

      <main className="grow flex items-center justify-center p-4">
        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.15)] max-w-xl w-full overflow-hidden">

          {step <= 2 && (
            <div className="bg-[#F4EDE1] px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-[#2A6B63] text-white' : 'bg-[#A8C4B0] text-white'}`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span className={`text-sm font-medium ${step === 1 ? 'text-[#332B25]' : 'text-[#A39A8C]'}`}>Select doctor & time</span>
              </div>
              <div className="h-0.5 bg-[#E8DFD0] grow mx-4"></div>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[#2A6B63] text-white' : 'bg-[#E8DFD0] text-[#A39A8C]'}`}>
                  2
                </span>
                <span className={`text-sm font-medium ${step === 2 ? 'text-[#332B25]' : 'text-[#A39A8C]'}`}>Patient information</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                  Find your schedule
                </h2>

                <div>
                  <label className="block text-sm font-medium text-[#332B25] mb-1.5">Select doctor & specialty</label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleDoctorChange}
                    disabled={loadingDoctors}
                    className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] bg-white transition-all"
                  >
                    <option value="">
                      {loadingDoctors ? '-- Loading doctors... --' : '-- Choose a doctor --'}
                    </option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>
                </div>

                {selectedDoctor && (
                  <p className="text-xs text-[#5C5249] bg-[#F4EDE1] px-3.5 py-2.5 rounded-xl">
                    Available {selectedDoctor.availableDays.join(', ')}
                    {' '}between{' '}
                    {selectedDoctor.availableTime.start} - {selectedDoctor.availableTime.end}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#332B25] mb-1.5">Preferred date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={todayString}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#332B25] mb-1.5">Available time slot</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    disabled={!formData.doctorId}
                    className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] bg-white disabled:bg-[#F4EDE1] disabled:text-[#A39A8C] transition-all"
                  >
                    <option value="">
                      {!formData.doctorId ? '-- Select a doctor first --' : '-- Choose a time --'}
                    </option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {formData.doctorId && timeSlots.length === 0 && (
                    <p className="text-xs text-[#C2553D] mt-1.5">
                      This doctor has no available time slots configured.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full mt-4 bg-[#EF8354] text-white py-3.5 rounded-2xl font-medium hover:bg-[#DD6E3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Continue to details <i className="ti ti-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                    Patient information
                  </h2>
                  <span className="text-xs bg-[#A8C4B0]/25 text-[#2A6B63] px-2.5 py-1 rounded-full font-medium">
                    {formData.doctorName}
                  </span>
                </div>

                {errorMessage && (
                  <p className="text-sm text-[#C2553D] bg-[#F9E4DC] py-2.5 px-3.5 rounded-xl">
                    {errorMessage}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#332B25] mb-1.5">Full name</label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] placeholder:text-[#A39A8C] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#332B25] mb-1.5">Email address</label>
                    <input
                      type="email"
                      name="patientEmail"
                      required
                      value={formData.patientEmail}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] placeholder:text-[#A39A8C] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#332B25] mb-1.5">Phone number</label>
                    <input
                      type="tel"
                      name="patientPhone"
                      required
                      value={formData.patientPhone}
                      onChange={handleChange}
                      placeholder="0771234567"
                      className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] placeholder:text-[#A39A8C] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#332B25] mb-1.5">Symptoms / notes (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Briefly describe your condition..."
                    rows={3}
                    className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-[#332B25] placeholder:text-[#A39A8C] resize-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-[#F4EDE1] text-[#5C5249] py-3.5 rounded-2xl font-medium hover:bg-[#E8DFD0] transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 bg-[#2A6B63] text-white py-3.5 rounded-2xl font-medium hover:bg-[#235953] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? 'Booking...' : 'Confirm appointment'} <i className="ti ti-check" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-[#A8C4B0]/30 text-[#2A6B63] rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                    Booking confirmed!
                  </h2>
                  <p className="text-sm text-[#5C5249] mt-1.5">Your appointment request has been placed successfully.</p>
                </div>

                <div className="relative bg-[#F4EDE1] rounded-2xl p-5 max-w-sm mx-auto space-y-2.5 text-left text-sm overflow-hidden">
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-3 bg-white"
                    style={{
                      maskImage: 'radial-gradient(circle at 8px 0, transparent 6px, black 6.5px)',
                      maskSize: '16px 100%',
                      maskRepeat: 'repeat-x',
                    }}
                    aria-hidden="true"
                  ></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Appointment no:</span> <span className="font-semibold text-[#2A6B63]">{successBookingNumber}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Doctor:</span> <span className="font-medium text-[#332B25]">{formData.doctorName}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Date & time:</span> <span className="font-medium text-[#332B25]">{formData.date} | {formData.timeSlot}</span></div>
                  <div className="flex justify-between"><span className="text-[#8A8074]">Patient:</span> <span className="font-medium text-[#332B25]">{formData.patientName}</span></div>
                </div>

                <p className="text-xs text-[#854F0B] bg-[#FAEEDA] py-2.5 px-3.5 rounded-xl inline-block">
                  Status is pending. Admin will confirm your slot via phone or email.
                </p>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full bg-[#332B25] text-white py-3.5 rounded-2xl font-medium hover:bg-[#241D19] transition-all block text-center"
                >
                  Go back to homepage
                </button>
              </div>
            )}

          </form>
        </div>
      </main>
    </div>
  );
}