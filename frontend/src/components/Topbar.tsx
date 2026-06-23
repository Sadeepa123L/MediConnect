interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-800 p-1 -ml-1"
          aria-label="Open menu"
        >
          <i className="ti ti-menu-2 text-xl" aria-hidden="true"></i>
        </button>
        <span className="text-sm sm:text-base font-medium text-gray-900 truncate">{title}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="w-8.5 h-8.5 shrink-0 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#185FA5]">
          AD
        </div>
        <span className="hidden sm:inline text-sm text-gray-500">Admin User</span>
      </div>
    </div>
  );
}