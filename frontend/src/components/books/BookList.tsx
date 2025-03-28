'use client';

import { Book } from '@/types/book';
import { getBooks } from '@/libs/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Paging from '@/components/paging/Paging';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getBooks(page, limit)
      .then((res) => {
        setBooks(res.data);
        setTotal(res.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  const moveToDetail = () => {
    router.push(`/books/${book.id}`);
  };

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className="space-y-6 max-w-3xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="flex items-start justify-between border p-4 rounded">
            <div className="flex gap-4">
              <div className="w-24 h-32 bg-gray-200 cursor-pointer" onClick={moveToDetail} />
              <div className="space-y-2">
                <p>
                  제목:
                  <span className="font-bold cursor-pointer" onClick={moveToDetail}>
                    {book.title}
                  </span>
                </p>
                <p>저자: {book.author}</p>
                <p>내용: {book.contents}</p>
              </div>
            </div>
            <button className="h-fit px-4 py-2 rounded self-center whitespace-nowrap bg-gray-700 text-white border border-gray-700 hover:bg-gray-900 cursor-pointer font-bold">
              삭제
            </button>
          </div>
        ))}
      </div>
      <Paging currentPage={page} totalItems={total} onPageChange={setPage} />
    </>
  );
}
