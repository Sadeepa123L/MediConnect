import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: 'ti ti-layout-dashboard' },
    { path: '/dashboard/doctors', label: 'Doctors', icon: 'ti ti-stethoscope' },
    { path: '/dashboard/appointments', label: 'Appointments', icon: 'ti ti-calendar' },
    { path: '/dashboard/profile', label: 'My profile', icon: 'ti ti-user' },
  ];

  return (
    <div className="w-55 min-w-55 bg-white border-r border-gray-200 flex flex-col py-5 select-none">
      <div className="px-5 pb-5 border-b border-gray-200 mb-3">
        <h2 className="text-[15px] font-medium text-gray-900 flex items-center gap-1.5">
          <i className="ti ti-heartbeat text-[#185FA5] text-lg" aria-hidden="true"></i>
          MediAdmin
        </h2>
        <p className="text-[13px] text-gray-500 mt-0.5">Management portal</p>
      </div>
      
      <nav className="flex-1 flex flex-col">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-sm cursor-pointer border-l-2 transition-all ${
                isActive
                  ? 'text-[#185FA5] bg-[#E6F1FB] border-[#185FA5] font-medium'
                  : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <i className={`${item.icon} text-lg`} aria-hidden="true"></i>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-3 border-t border-gray-200">
        <button 
          onClick={() => console.log("Logout triggered")}
          className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50/50 w-full text-left font-sans transition-all"
        >
          <i className="ti ti-logout text-lg" aria-hidden="true"></i>
          Log out ↗
        </button>
      </div>
    </div>
  );
}