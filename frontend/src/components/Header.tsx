import { Plus } from "lucide-react";
import { useAppModal } from "../hooks/useModal";

type Props = {};

export default function Header({}: Props) {
  const modal = useAppModal();
  return (
    <div className="w-full flex items-center justify-center px-4 py-4 bg-white">
      <div className="flex flex-col w-full max-w-3xl items-center gap-3">
        <input
          type="text"
          placeholder="Enter a dish of your wish..."
          className="flex-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => modal!.setOpen(true)}
          aria-label="Add new dish"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
