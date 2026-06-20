import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
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
  const [step, setStep] = useState(1);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: date ? format(date, 'yyyy-MM-dd') : '',
    }));
    setShowCalendar(false);
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
  today.setHours(0, 0, 0, 0);

  const selectedDoctor = doctors.find(d => d._id === formData.doctorId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
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

      <main className="grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-xl w-full overflow-hidden">

          {step <= 2 && (
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-[#185FA5] text-white' : 'bg-green-500 text-white'}`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span className={`text-sm font-medium ${step === 1 ? 'text-gray-950' : 'text-gray-400'}`}>Select Doctor & Time</span>
              </div>
              <div className="h-0.5 bg-gray-200 grow mx-4"></div>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[#185FA5] text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </span>
                <span className={`text-sm font-medium ${step === 2 ? 'text-gray-950' : 'text-gray-400'}`}>Patient Information</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Find Your Schedule</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor & Specialty</label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleDoctorChange}
                    disabled={loadingDoctors}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-gray-700 bg-white"
                  >
                    <option value="">
                      {loadingDoctors ? '-- Loading doctors... --' : '-- Choose a Doctor --'}
                    </option>
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>
                </div>

                {selectedDoctor && (
                  <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                    Available {selectedDoctor.availableDays.join(', ')}
                    {' '}between{' '}
                    {selectedDoctor.availableTime.start} - {selectedDoctor.availableTime.end}
                  </p>
                )}

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(prev => !prev)}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-left flex items-center justify-between bg-white"
                  >
                    <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                    </span>
                    <i className="ti ti-calendar text-gray-400"></i>
                  </button>

                  {showCalendar && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={{ before: today }}
                        classNames={{
                          today: 'text-[#185FA5] font-bold',
                          selected: 'bg-[#185FA5] text-white rounded-md',
                          day_button: 'rounded-md hover:bg-blue-50',
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slot</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    disabled={!formData.doctorId}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5] text-gray-700 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">
                      {!formData.doctorId ? '-- Select a doctor first --' : '-- Choose a Time --'}
                    </option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {formData.doctorId && timeSlots.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      This doctor has no available time slots configured.
                    </p>
                  )}
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

            {step === 2 && (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Patient Information</h2>
                  <span className="text-xs bg-blue-50 text-[#185FA5] px-2 py-1 rounded font-medium">
                    {formData.doctorName}
                  </span>
                </div>

                {errorMessage && (
                  <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}

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
                    disabled={submitting}
                    className="w-2/3 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? 'Booking...' : 'Confirm Appointment'} <i className="ti ti-check"></i>
                  </button>
                </div>
              </div>
            )}

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