import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTitle = () => {
    if (location.pathname.includes('doctors')) return 'Doctor management';
    if (location.pathname.includes('appointments')) return 'Appointment management';
    if (location.pathname.includes('profile')) return 'My profile';
    return 'Overview';
  };

return (
  <div className="flex min-h-screen bg-gray-50 font-sans">
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      <Topbar title={getTitle()} onMenuClick={() => setSidebarOpen(true)} />
      <div className="p-4 sm:p-6 overflow-y-auto flex-1">
        <Outlet />
      </div>
    </div>
  </div>
);
}