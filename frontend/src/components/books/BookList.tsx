'use client';

import { BookProps } from '@/types/book';
import { getBooks } from '@/libs/api';
import { useEffect, useState } from 'react';
import Paging from '@/components/paging/Paging';
import BookDetailModal from './BookDetailModal';
import BookEditModal from './BookEditModal';
import BookDeleteModal from './BookDeleteModal';
import BookCreateModal from './BookCreateModal';

export default function BookList() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getBooks(page, limit)
      .then((res) => {
        setBooks(res.data);
        setTotal(res.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit, refresh]);

  if (loading) return <p>loading...</p>;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm">
        <div className="mx-auto max-w-screen-lg h-[64px] flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-2 flex-nowrap">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-[180px] sm:w-[220px] border px-3 py-2 rounded"
            />
            <button className="bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 px-4 py-2 rounded whitespace-nowrap cursor-pointer font-bold">
              검색
            </button>
            <BookCreateModal onCreated={() => setRefresh((prev) => prev + 1)}>
              <button className="bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 px-4 py-2 rounded whitespace-nowrap cursor-pointer font-bold">
                등록
              </button>
            </BookCreateModal>
          </div>
        </div>
      </header>
      <div className="space-y-6 max-w-3xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="flex items-start justify-between border p-4 rounded">
            <div className="flex gap-4">
              <BookDetailModal book={book}>
                <div className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-900 font-bold flex items-center justify-center ">
                  상세 보기
                </div>
              </BookDetailModal>

              <div className="space-y-2">
                <p>
                  제목:
                  <BookDetailModal book={book}>
                    <span className="font-bold cursor-pointer">{book.title}</span>
                  </BookDetailModal>
                </p>
                <p>저자: {book.author}</p>
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
        ))}
      </div>
      <Paging currentPage={page} totalItems={total} onPageChange={setPage} />
    </>
  );
}
