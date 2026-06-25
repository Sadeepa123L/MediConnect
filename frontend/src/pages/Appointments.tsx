import { useState, useEffect } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../services/appoinmentService";
import type { Appointment, AppointmentStatus } from "../types/appointment";

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: AppointmentStatus) => {
    try {
      const updated = await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: updated.status } : a))
      );
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const filteredAppointments =
    statusFilter === "All"
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  const statusStyles: Record<AppointmentStatus, string> = {
    Pending: "bg-[#FAEEDA] text-[#854F0B]",
    Confirmed: "bg-[#EAF3DE] text-[#3B6D11]",
    Cancelled: "bg-[#FCEBEB] text-[#A32D2D]",
  };

  return (
    <div className="animate-fadeIn w-full relative min-h-full">
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#A8C4B0]/15 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-[#EF8354]/5 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Appointment management
          </h2>
          <p className="text-sm text-[#5C5249] mt-1">View, confirm, or cancel patient bookings.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto text-sm p-3 px-4 border border-[#E8DFD0] rounded-xl bg-[#FAF8F5] outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all cursor-pointer text-[#5C5249] font-medium shadow-xs"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] border border-[#E8DFD0]/50 rounded-[28px] p-6 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] mb-6">
        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full border-collapse text-[13px] min-w-190">
            <thead>
              <tr>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">
                  Patient
                </th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">
                  Doctor
                </th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">
                  Date & time
                </th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">
                  Status
                </th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-sm text-[#A39A8C]">
                    Loading appointments...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-sm text-[#A39A8C]">
                    No appointments found
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-[#FBF6EF]/50 transition-colors duration-200">
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#332B25] font-semibold whitespace-nowrap">
                      {appt.patientName}
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#5C5249] font-medium whitespace-nowrap">
                      {appt.doctorName}
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#332B25] whitespace-nowrap">
                      {appt.date} <span className="text-[#A39A8C] mx-1.5">—</span> {appt.timeSlot}
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${statusStyles[appt.status]}`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {appt.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(appt._id, "Confirmed")}
                              className="border border-[#2A6B63]/25 bg-white text-[#2A6B63] hover:bg-[#2A6B63]/5 hover:border-[#2A6B63] hover:shadow-xs transition-all duration-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <i className="ti ti-check" aria-hidden="true"></i> Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(appt._id, "Cancelled")}
                              className="border border-red-200 bg-[#FCEBEB]/40 text-[#A32D2D] hover:bg-[#FCEBEB] hover:border-red-300 transition-all duration-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <i className="ti ti-x" aria-hidden="true"></i> Cancel
                            </button>
                          </>
                        )}
                        {appt.status === "Confirmed" && (
                          <button
                            onClick={() => handleUpdateStatus(appt._id, "Cancelled")}
                            className="border border-red-200 bg-[#FCEBEB]/40 text-[#A32D2D] hover:bg-[#FCEBEB] hover:border-red-300 transition-all duration-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="ti ti-x" aria-hidden="true"></i> Cancel
                          </button>
                        )}
                        {appt.status === "Cancelled" && (
                          <button
                            onClick={() => handleDelete(appt._id)}
                            className="border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="ti ti-trash" aria-hidden="true"></i> Delete
                          </button>
                        )}
                      </div>
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