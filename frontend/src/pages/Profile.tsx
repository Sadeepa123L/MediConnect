
export default function Profile() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-medium text-gray-900">My profile</h3>
        <button className="inline-flex items-center gap-1.5 bg-[#185FA5] text-white rounded-md px-4 py-1.5 text-xs font-sans hover:bg-[#0C447C] transition-all">
          <i className="ti ti-device-floppy" aria-hidden="true"></i> Save changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#E6F1FB] flex items-center justify-center text-3xl font-medium text-[#185FA5]">AD</div>
          <div className="text-center">
            <div className="text-[15px] font-medium text-gray-900">Admin User</div>
            <div className="text-xs text-gray-400">ADMIN</div>
          </div>
          <button className="border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-1"><i className="ti ti-style-style" aria-hidden="true"></i> Change photo</button>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Full name</label>
              <input type="text" defaultValue="Admin User" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Email address</label>
              <input type="email" defaultValue="admin@clinic.com" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
            </div>
          </div>
          
          <div className="h-[0.5px] bg-gray-200 my-5"></div>
          <p className="text-[13px] font-medium text-gray-900 mb-3">Change password</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Current password</label>
              <input type="password" placeholder="••••••••" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">New password</label>
              <input type="password" placeholder="••••••••" className="p-2 border border-gray-200 rounded-md text-sm outline-none focus:border-[#185FA5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}