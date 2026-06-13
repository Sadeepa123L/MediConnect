import React from 'react';

export default function Appointments() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-gray-900">All appointments</h3>
          <select className="text-sm p-1.5 px-2.5 border border-gray-200 rounded-md bg-white outline-none">
            <option>All statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Patient</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Doctor</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Date & time</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Status</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50/70">
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Kavinda Perera</td>
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900">Dr. Nimal Silva</td>
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">Jun 14, 2026 — 10:00 AM</td>
                <td className="p-2.5 px-3 border-b border-gray-100"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAEEDA] text-[#854F0B]">Pending</span></td>
                <td className="p-2.5 px-3 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <button className="border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-1"><i className="ti ti-check" aria-hidden="true"></i> Confirm</button>
                    <button className="border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1"><i className="ti ti-x" aria-hidden="true"></i> Cancel</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}