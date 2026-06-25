import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../services/doctorService';
import { getAllAppointments } from '../services/appoinmentService';
import type { Doctor } from '../types/doctor';
import type { Appointment } from '../types/appointment';

export default function Overview() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doctorsData, appointmentsData] = await Promise.all([
        getAllDoctors(),
        getAllAppointments(),
      ]);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Failed to fetch overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalDoctors = doctors.length;
  const totalSpecialties = new Set(doctors.map(d => d.specialty)).size;
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statusStyles: Record<string, string> = {
    Pending: 'bg-[#FAEEDA] text-[#854F0B]',
    Confirmed: 'bg-[#EAF3DE] text-[#3B6D11]',
    Cancelled: 'bg-[#FCEBEB] text-[#A32D2D]',
  };

  return (
    <div className="animate-fadeIn relative min-h-full">
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#A8C4B0]/15 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-[#EF8354]/5 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>

      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight animate-slideDown" style={{ fontFamily: "'Fraunces', serif" }}>
          Overview
        </h2>
        <p className="text-sm text-[#5C5249] mt-1">Monitor appointments, doctors, and system stats.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] rounded-3xl p-5 border border-[#E8DFD0]/50 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] hover:shadow-[0_12px_28px_-8px_rgba(51,43,37,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C5249] truncate">Total doctors</span>
              <div className="w-8 h-8 rounded-full bg-[#A8C4B0]/30 flex items-center justify-center shrink-0">
                <i className="ti ti-stethoscope text-[#2A6B63] text-base" aria-hidden="true"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight animate-countUp" style={{ fontFamily: "'Fraunces', serif" }}>
              {loading ? '-' : totalDoctors}
            </div>
          </div>
          <div className="text-xs text-[#5C5249]/80 mt-2 font-medium bg-[#A8C4B0]/15 self-start px-2 py-0.5 rounded-md">
            {loading ? '' : `${totalSpecialties} specialties`}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] rounded-3xl p-5 border border-[#E8DFD0]/50 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] hover:shadow-[0_12px_28px_-8px_rgba(51,43,37,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C5249] truncate">Appointments</span>
              <div className="w-8 h-8 rounded-full bg-[#EF8354]/15 flex items-center justify-center shrink-0">
                <i className="ti ti-calendar text-[#EF8354] text-base" aria-hidden="true"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              {loading ? '-' : totalAppointments}
            </div>
          </div>
          <div className="text-xs text-[#5C5249]/80 mt-2 font-medium bg-[#EF8354]/10 self-start px-2 py-0.5 rounded-md">
            All time
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] rounded-3xl p-5 border border-[#E8DFD0]/50 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] hover:shadow-[0_12px_28px_-8px_rgba(51,43,37,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C5249] truncate">Pending</span>
              <div className="w-8 h-8 rounded-full bg-[#FAEEDA] flex items-center justify-center shrink-0">
                <i className="ti ti-clock text-[#854F0B] text-base" aria-hidden="true"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-[#854F0B] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              {loading ? '-' : pendingCount}
            </div>
          </div>
          <div className="text-xs text-[#854F0B]/85 mt-2 font-medium bg-[#FAEEDA] self-start px-2 py-0.5 rounded-md">
            Awaiting confirm
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] rounded-3xl p-5 border border-[#E8DFD0]/50 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] hover:shadow-[0_12px_28px_-8px_rgba(51,43,37,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-[13px] font-medium text-[#5C5249] truncate">Confirmed</span>
              <div className="w-8 h-8 rounded-full bg-[#EAF3DE] flex items-center justify-center shrink-0">
                <i className="ti ti-check text-[#3B6D11] text-base" aria-hidden="true"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-[#3B6D11] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              {loading ? '-' : confirmedCount}
            </div>
          </div>
          <div className="text-xs text-[#3B6D11]/85 mt-2 font-medium bg-[#EAF3DE] self-start px-2 py-0.5 rounded-md">
            {loading ? '' : `${cancelledCount} cancelled`}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] border border-[#E8DFD0]/50 rounded-[28px] p-6 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] mb-6">
        <div className="flex items-center justify-between mb-6 gap-2">
          <h3 className="text-lg font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>Recent appointments</h3>
          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="inline-flex items-center gap-1.5 bg-white border border-[#2A6B63]/20 rounded-xl px-4 py-2 text-xs font-medium text-[#2A6B63] hover:bg-[#2A6B63]/5 hover:border-[#2A6B63] hover:shadow-sm transition-all duration-200 shrink-0 cursor-pointer"
          >
            <i className="ti ti-arrow-right" aria-hidden="true"></i> <span className="hidden sm:inline">View all</span>
          </button>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full border-collapse text-[13px] min-w-120">
            <thead>
              <tr>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Patient</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Doctor</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Date</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-sm text-[#A39A8C]">
                    Loading appointments...
                  </td>
                </tr>
              ) : recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-sm text-[#A39A8C]">
                    No appointments found
                  </td>
                </tr>
              ) : (
                recentAppointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-[#FBF6EF]/50 transition-colors duration-200">
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#332B25] font-medium whitespace-nowrap">{appt.patientName}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#5C5249] whitespace-nowrap">{appt.doctorName}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#5C5249] whitespace-nowrap">{appt.date}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyles[appt.status]}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}