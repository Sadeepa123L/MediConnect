
interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between select-none">
      <span className="text-base font-medium text-gray-900">{title}</span>
      <div className="flex items-center gap-2.5">
        <div className=".w-[34px] height-[34px] .h-[34px] rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#185FA5]">
          AD
        </div>
        <span className="text-sm text-gray-500">Admin User</span>
      </div>
    </div>
  );
}