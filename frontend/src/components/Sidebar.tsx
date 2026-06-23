import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: 'ti ti-layout-dashboard' },
    { path: '/dashboard/doctors', label: 'Doctors', icon: 'ti ti-stethoscope' },
    { path: '/dashboard/appointments', label: 'Appointments', icon: 'ti ti-calendar' },
    { path: '/dashboard/profile', label: 'My profile', icon: 'ti ti-user' },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-55 min-w-55 bg-white border-r border-gray-200 flex flex-col py-5 select-none z-50 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-5 pb-5 border-b border-gray-200 mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-medium text-gray-900 flex items-center gap-1.5">
              <i className="ti ti-heartbeat text-[#185FA5] text-lg" aria-hidden="true"></i>
              MediAdmin
            </h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Management portal</p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close menu"
          >
            <i className="ti ti-x text-xl" aria-hidden="true"></i>
          </button>
        </div>

        <nav className="flex-1 flex flex-col overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
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
    </>
  );
}