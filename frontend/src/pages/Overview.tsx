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
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-stethoscope" aria-hidden="true"></i> Total doctors</div>
          <div className="text-2xl font-medium text-gray-900">{loading ? '-' : totalDoctors}</div>
          <div className="text-xs text-gray-400 mt-0.5">{loading ? '' : `${totalSpecialties} specialties`}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-calendar" aria-hidden="true"></i> Appointments</div>
          <div className="text-2xl font-medium text-gray-900">{loading ? '-' : totalAppointments}</div>
          <div className="text-xs text-gray-400 mt-0.5">All time</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-clock" aria-hidden="true"></i> Pending</div>
          <div className="text-2xl font-medium text-gray-900">{loading ? '-' : pendingCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Awaiting confirm</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-check" aria-hidden="true"></i> Confirmed</div>
          <div className="text-2xl font-medium text-gray-900">{loading ? '-' : confirmedCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">{loading ? '' : `${cancelledCount} cancelled`}</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-gray-900">Recent appointments</h3>
          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="inline-flex items-center gap-1.5 bg-transparent border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-500 font-sans hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <i className="ti ti-arrow-right" aria-hidden="true"></i> View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Patient</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Doctor</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Date</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    Loading appointments...
                  </td>
                </tr>
              ) : recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                recentAppointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50/70">
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">{appt.patientName}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">{appt.doctorName}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">{appt.date}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100">
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