'use client';

import { BookProps } from '@/types/book';
import { getBooks } from '@/libs/api';
import { useEffect, useState } from 'react';
import ShadcnPagination from '@/components/pagination/Pagination';
import BookDetailModal from './BookDetailModal';
import BookEditModal from './BookEditModal';
import BookDeleteModal from './BookDeleteModal';
import SearchHeader from '@/components/header/SearchHeader';

export default function BookList() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const limit = 10;

  useEffect(() => {
    getBooks(page, limit, search)
      .then((res) => {
        setBooks(res.data);
        setTotal(res.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit, refresh, search]);

  return (
    <>
      <SearchHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={setSearch}
        onCreated={() => setRefresh((prev) => prev + 1)}
      />
      <div className="space-y-6 max-w-3xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 font-semibold my-10">로딩 중...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold my-10">결과가 없습니다.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="flex items-start justify-between border p-4 rounded">
              <div className="flex gap-4">
                <BookDetailModal book={book}>
                  <div className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-900 font-bold flex items-center justify-center ">
                    상세 보기
                  </div>
                </BookDetailModal>

                <div className="space-y-2">
                  <p>
                    제목:{' '}
                    <BookDetailModal book={book}>
                      <span className="font-bold cursor-pointer">{book.title}</span>
                    </BookDetailModal>
                  </p>
                  <p>저자: {book.author}</p>
                  <p>수량: {book.quantity}</p>
                  <p>내용: {book.contents}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 self-center">
                <BookEditModal
                  book={book}
                  onUpdated={() => {
                    setRefresh((prev) => prev + 1);
                  }}
                >
                  <button className="h-fit  px-4 py-2 rounded self-center whitespace-nowrap bg-gray-300 text-white bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 cursor-pointer font-bold">
                    수정
                  </button>
                </BookEditModal>
                <BookDeleteModal book={book} onDeleted={() => setRefresh((prev) => prev + 1)}>
                  <button className="h-fit px-4 py-2 rounded self-center whitespace-nowrap bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 cursor-pointer font-bold">
                    삭제
                  </button>
                </BookDeleteModal>
              </div>
            </div>
          ))
        )}
      </div>
      <ShadcnPagination currentPage={page} totalItems={total} onPageChange={setPage} />
    </>
  );
}
