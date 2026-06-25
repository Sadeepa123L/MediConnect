import { useState, useEffect } from "react";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";
import type { Doctor, DoctorFormData } from "../types/doctor";

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

  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "consultationFee" ? Number(value) : value,
    }));
  };

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

  const handleTimeChange = (
    field: "start" | "end",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      availableTime: { ...prev.availableTime, [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, formData);
      } else {
        await createDoctor(formData);
      }
      setIsModalOpen(false);
      fetchDoctors();
    } catch (error) {
      console.error("Failed to save doctor:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);
      fetchDoctors();
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
    <div className="animate-fadeIn relative min-h-full">
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#A8C4B0]/15 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-[#EF8354]/5 blur-3xl -z-10 pointer-events-none" aria-hidden="true"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#332B25] tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Doctor management
          </h2>
          <p className="text-sm text-[#5C5249] mt-1">Add, update, and manage doctor schedules.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-[#EF8354] text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-[#DD6E3D] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shrink-0 cursor-pointer"
        >
          <i className="ti ti-plus text-base" aria-hidden="true"></i> <span>Add doctor</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] border border-[#E8DFD0]/50 rounded-[28px] p-6 shadow-[0_8px_24px_-8px_rgba(51,43,37,0.08)] mb-6">
        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full border-collapse text-[13px] min-w-190">
            <thead>
              <tr>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Name</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Specialty</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Phone</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Fee (LKR)</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Available days</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Status</th>
                <th className="text-left p-3.5 px-4 text-xs font-semibold text-[#5C5249] uppercase tracking-wider border-b border-[#F4EDE1]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-sm text-[#A39A8C]">
                    Loading doctors...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-sm text-[#A39A8C]">
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-[#FBF6EF]/50 transition-colors duration-200">
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#332B25] font-semibold whitespace-nowrap">
                      {doc.name}
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#5C5249] whitespace-nowrap">{doc.specialty}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#5C5249] whitespace-nowrap">{doc.phone}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] text-[#332B25] font-medium whitespace-nowrap">{doc.consultationFee.toLocaleString()}</td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {doc.availableDays.map((day) => (
                          <span key={day} className="inline-block bg-[#FBF6EF] text-[#5C5249] px-2 py-0.5 rounded-lg text-[11px] font-medium border border-[#E8DFD0]/40">
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                          doc.isActive
                            ? "bg-[#EAF3DE] text-[#3B6D11]"
                            : "bg-[#FAEEDA] text-[#854F0B]"
                        }`}
                      >
                        {doc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3.5 px-4 border-b border-[#F4EDE1] whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit(doc)}
                          className="inline-flex items-center gap-1 bg-white border border-[#2A6B63]/25 text-[#2A6B63] hover:bg-[#2A6B63]/5 hover:border-[#2A6B63] hover:shadow-xs transition-all duration-200 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer"
                        >
                          <i className="ti ti-edit" aria-hidden="true"></i> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="inline-flex items-center gap-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-gradient-to-br from-[#F3F7F5] to-[#FAF8F5] rounded-[28px] border border-[#E8DFD0]/50 p-6 md:p-8 w-full sm:w-130 max-w-full shadow-2xl max-h-[90vh] overflow-y-auto relative animate-scaleUp">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#332B25]" style={{ fontFamily: "'Fraunces', serif" }}>
                {editingDoctor ? "Edit doctor details" : "Register new doctor"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#A39A8C] hover:text-[#332B25] p-1.5 rounded-full hover:bg-[#FBF6EF] transition-all cursor-pointer">
                <i className="ti ti-x text-lg" aria-hidden="true"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Full name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Dr. John Silva"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  placeholder="Cardiologist"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+94771234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Consultation fee (LKR)</label>
                <input
                  type="number"
                  name="consultationFee"
                  placeholder="2500"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">Start time</label>
                <input
                  type="time"
                  value={formData.availableTime.start}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider">End time</label>
                <input
                  type="time"
                  value={formData.availableTime.end}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                  className="p-3 border border-[#E8DFD0] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold text-[#5C5249] uppercase tracking-wider block mb-2.5">Available days</label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => {
                  const isSelected = formData.availableDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#2A6B63] text-white border-[#2A6B63] shadow-xs"
                          : "bg-white text-[#5C5249] border-[#E8DFD0] hover:bg-[#FBF6EF]"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-[#E8DFD0] text-[#5C5249] hover:bg-[#FBF6EF] px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#2A6B63] hover:bg-[#235953] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 order-1 sm:order-2"
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