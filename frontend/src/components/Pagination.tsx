import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { IRecipePagination } from "../types/IRecipeResponse";

type Props = {
  recipies: IRecipePagination;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ recipies, page = 1, setPage }: Props) {
  const totalPages = recipies?.pagination.totalPages;

  function loadNext() {
    if (totalPages && page === totalPages) return;
    setPage((pre) => pre + 1);
  }

  function loadPrevious() {
    if (totalPages && page === 1) return;
    setPage((pre) => pre - 1);
  }

  return (
    <div className="flex justify-center m-4">
      <div className="inline-flex items-center space-x-2">
        <button
          className="p-4 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-300 disabled:bg-gray-100"
          disabled={page <= 1}
          onClick={loadPrevious}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <span>
            {page}/{totalPages}
          </span>
        </div>
        <button
          className="p-4 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-300 disabled:bg-gray-100"
          disabled={page === totalPages}
          onClick={loadNext}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
