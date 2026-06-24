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
    <div className="animate-fadeIn w-full">
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
          <h3 className="text-sm sm:text-[15px] font-medium text-gray-900">
            All appointments
          </h3>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto text-sm p-2 sm:p-1.5 px-3 sm:px-2.5 border border-gray-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full border-collapse text-[13px] min-w-190">
            <thead>
              <tr>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                  Patient
                </th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                  Doctor
                </th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                  Date & time
                </th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                  Status
                </th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-sm text-gray-400">
                    Loading appointments...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-sm text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900 whitespace-nowrap">
                      {appt.patientName}
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900 whitespace-nowrap">
                      {appt.doctorName}
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950 whitespace-nowrap">
                      {appt.date} <span className="text-gray-400 mx-1">—</span> {appt.timeSlot}
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyles[appt.status]}`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {appt.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(appt._id, "Confirmed")}
                              className="border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-600 hover:bg-white hover:shadow-sm hover:border-gray-300 transition-all flex items-center gap-1"
                            >
                              <i className="ti ti-check" aria-hidden="true"></i> Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(appt._id, "Cancelled")}
                              className="border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-1"
                            >
                              <i className="ti ti-x" aria-hidden="true"></i> Cancel
                            </button>
                          </>
                        )}
                        {appt.status === "Confirmed" && (
                          <button
                            onClick={() => handleUpdateStatus(appt._id, "Cancelled")}
                            className="border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-1"
                          >
                            <i className="ti ti-x" aria-hidden="true"></i> Cancel
                          </button>
                        )}
                        {appt.status === "Cancelled" && (
                          <button
                            onClick={() => handleDelete(appt._id)}
                            className="border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-1"
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