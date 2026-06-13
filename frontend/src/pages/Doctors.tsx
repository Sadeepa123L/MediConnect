import  { useState } from 'react';

export default function Doctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-gray-900">All doctors</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
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
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Fee (LKR)</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Available days</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Status</th>
                <th className="text-left p-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50/70">
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-900"><strong>Dr. Nimal Silva</strong></td>
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">Cardiologist</td>
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">2,500</td>
                <td className="p-2.5 px-3 border-b border-gray-100 text-gray-950">Mon, Wed, Fri</td>
                <td className="p-2.5 px-3 border-b border-gray-100"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EAF3DE] text-[#3B6D11]">Active</span></td>
                <td className="p-2.5 px-3 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-1 bg-transparent border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50 transition-all"><i className="ti ti-edit" aria-hidden="true"></i> Edit</button>
                    <button className="inline-flex items-center gap-1 bg-transparent border border-red-200 rounded-md px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 transition-all"><i className="ti ti-trash" aria-hidden="true"></i> Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-120 max-w-[90%] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-medium text-gray-900">Add doctor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><i className="ti ti-x text-lg" aria-hidden="true"></i></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Full name</label>
                <input type="text" placeholder="Dr. John Silva" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Specialty</label>
                <input type="text" placeholder="Cardiologist" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Consultation fee (LKR)</label>
                <input type="number" placeholder="2500" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setIsModalOpen(false)} className="border border-gray-200 text-gray-500 px-4 py-1.5 rounded-md text-sm hover:bg-gray-50">Cancel</button>
              <button className="bg-[#185FA5] text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#0C447C] flex items-center gap-1"><i className="ti ti-device-floppy" aria-hidden="true"></i> Save doctor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}