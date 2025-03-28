'use client';
import { PagingProps } from '@/types/book';

export default function Paging({
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PagingProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded border hover:bg-gray-100 transition cursor-pointer ${
            currentPage === i + 1 ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
