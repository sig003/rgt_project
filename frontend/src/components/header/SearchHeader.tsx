'use client';

import BookCreateModal from '@/components/books/BookCreateModal';
import { SearchHeaderProps } from '@/types/book';

export default function Header({
  searchInput,
  setSearchInput,
  setSearch,
  onCreated,
}: SearchHeaderProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchInput);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm">
      <div className="mx-auto max-w-screen-lg h-[64px] flex items-center justify-center px-4">
        <div className="flex items-center justify-center gap-2 flex-nowrap">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-[180px] sm:w-[220px] border px-3 py-2 rounded"
          />
          <button
            className="bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 px-4 py-2 rounded whitespace-nowrap cursor-pointer font-bold"
            onClick={() => setSearch(searchInput)}
          >
            검색
          </button>
          <BookCreateModal onCreated={onCreated}>
            <button className="bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 px-4 py-2 rounded whitespace-nowrap cursor-pointer font-bold">
              등록
            </button>
          </BookCreateModal>
        </div>
      </div>
    </header>
  );
}
