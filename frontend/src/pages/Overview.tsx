import { useNavigate } from 'react-router-dom';

export default function Overview() {
  const navigate = useNavigate();

  return (
    <div className="animate-fadeIn">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-stethoscope" aria-hidden="true"></i> Total doctors</div>
          <div className="text-2xl font-medium text-gray-900">12</div>
          <div className="text-xs text-gray-400 mt-0.5">4 specialties</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-calendar" aria-hidden="true"></i> Appointments</div>
          <div className="text-2xl font-medium text-gray-900">48</div>
          <div className="text-xs text-gray-400 mt-0.5">This month</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-clock" aria-hidden="true"></i> Pending</div>
          <div className="text-2xl font-medium text-gray-900">7</div>
          <div className="text-xs text-gray-400 mt-0.5">Awaiting confirm</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-[13px] text-gray-500 mb-1.5 flex items-center gap-1.5"><i className="ti ti-check" aria-hidden="true"></i> Completed</div>
          <div className="text-2xl font-medium text-gray-900">38</div>
          <div className="text-xs text-gray-400 mt-0.5">This month</div>
        </div>
      </div>

      {/* RECENT APPOINTMENTS CARD */}
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
              <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Patient</th>
              <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Doctor</th>
              <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Date</th>
              <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Status</th>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50/70"><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Kavinda Perera</td><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Dr. Nimal Silva</td><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Jun 14, 2026</td><td className="p-2.5 px-3 border-b border-gray-100"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAEEDA] text-[#854F0B]">Pending</span></td></tr>
              <tr className="hover:bg-gray-50/70"><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Amali Fernando</td><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Dr. Sanka Jayawardena</td><td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Jun 13, 2026</td><td className="p-2.5 px-3 border-b border-gray-100"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF3DE] text-[#3B6D11]">Confirmed</span></td></tr>
              <tr className="hover:bg-gray-50/70"><td className="p-2.5 px-3 border-none text-gray-900">Ruwan Dissanayake</td><td className="p-2.5 px-3 border-none text-gray-900">Dr. Priya Wijesinghe</td><td className="p-2.5 px-3 border-none text-gray-900">Jun 12, 2026</td><td className="p-2.5 px-3 border-none"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E6F1FB] text-[#185FA5]">Completed</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}