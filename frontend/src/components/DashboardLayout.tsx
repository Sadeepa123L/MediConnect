import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes('doctors')) return 'Doctor management';
    if (location.pathname.includes('appointments')) return 'Appointment management';
    if (location.pathname.includes('profile')) return 'My profile';
    return 'Overview';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 border border-gray-200 rounded-xl overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={getTitle()} />
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}