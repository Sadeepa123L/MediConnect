import { useState, useEffect } from "react";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";
import type { Doctor, DoctorFormData } from "../types/doctor";

// What the form needs to track — same as DoctorFormData but
// availableDays as a comma string for easier typing in one input
const emptyForm: DoctorFormData = {
  name: "",
  specialty: "",
  phone: "",
  consultationFee: 0,
  availableDays: [],
  availableTime: { start: "09:00", end: "17:00" },
};

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<DoctorFormData>(emptyForm);

  // ── Fetch doctors when page loads ──
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Open modal for ADD ──
  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  // ── Open modal for EDIT (pre-fill form) ──
  const handleOpenEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      phone: doctor.phone,
      consultationFee: doctor.consultationFee,
      availableDays: doctor.availableDays,
      availableTime: doctor.availableTime,
    });
    setIsModalOpen(true);
  };

  // ── Handle text/number input changes ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "consultationFee" ? Number(value) : value,
    }));
  };

  // ── Handle availableDays (checkboxes) ──
  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.availableDays.includes(day);
      return {
        ...prev,
        availableDays: alreadySelected
          ? prev.availableDays.filter((d) => d !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  // ── Handle start/end time changes ──
  const handleTimeChange = (
    field: "start" | "end",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      availableTime: { ...prev.availableTime, [field]: value },
    }));
  };

  // ── Save (create or update depending on mode) ──
  const handleSave = async () => {
    try {
      if (editingDoctor) {
        console.log("Updating doctor with ID:", editingDoctor._id);
        // UPDATE mode
        await updateDoctor(editingDoctor._id, formData);
      } else {
        // CREATE mode
        await createDoctor(formData);
      }
      setIsModalOpen(false);
      fetchDoctors(); // refresh table after save
    } catch (error) {
      console.error("Failed to save doctor:", error);
    }
  };

  // ── Delete doctor ──
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);
      fetchDoctors(); // refresh table after delete
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-gray-900">All doctors</h3>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 bg-[#185FA5] text-white rounded-md px-3.5 py-1.5 text-[13px] font-sans hover:bg-[#0C447C] transition-all"
          >
            <i className="ti ti-plus" aria-hidden="true"></i> Add doctor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Name</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Specialty</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Phone</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Fee (LKR)</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Available days</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Status</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-400">
                    Loading doctors...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-400">
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50/70">
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">
                      <strong>{doc.name}</strong>
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">{doc.specialty}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">{doc.phone}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">{doc.consultationFee.toLocaleString()}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">{doc.availableDays.join(", ")}</td>
                    <td className="p-2.5 px-3 border-b border-gray-100">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          doc.isActive
                            ? "bg-[#EAF3DE] text-[#3B6D11]"
                            : "bg-[#FAEEDA] text-[#854F0B]"
                        }`}
                      >
                        {doc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2.5 px-3 border-b border-gray-100">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="inline-flex items-center gap-1 bg-transparent border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50 transition-all"
                        >
                          <i className="ti ti-edit" aria-hidden="true"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="inline-flex items-center gap-1 bg-transparent border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 transition-all"
                        >
                          <i className="ti ti-trash" aria-hidden="true"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-120 max-w-[90%] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-medium text-gray-900">
                {editingDoctor ? "Edit doctor" : "Add doctor"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" aria-hidden="true"></i>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Full name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Dr. John Silva"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  placeholder="Cardiologist"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+94771234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Consultation fee (LKR)</label>
                <input
                  type="number"
                  name="consultationFee"
                  placeholder="2500"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Start time</label>
                <input
                  type="time"
                  value={formData.availableTime.start}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">End time</label>
                <input
                  type="time"
                  value={formData.availableTime.end}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                  className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]"
                />
              </div>
            </div>

            {/* Available Days — checkboxes */}
            <div className="mt-4">
              <label className="text-xs font-medium text-gray-500 block mb-2">Available days</label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`px-2.5 py-1 rounded-md text-xs border transition-all ${
                      formData.availableDays.includes(day)
                        ? "bg-[#185FA5] text-white border-[#185FA5]"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-200 text-gray-500 px-4 py-1.5 rounded-md text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#185FA5] text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#0C447C] flex items-center gap-1"
              >
                <i className="ti ti-device-floppy" aria-hidden="true"></i> Save doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}