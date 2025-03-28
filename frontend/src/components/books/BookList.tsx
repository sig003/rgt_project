'use client';

import { Book } from '@/types/book';
import { getBooks } from '@/libs/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  const moveToDetail = () => {
    router.push(`/books/${book.id}`);
  };

  if (loading) return <p>loading...</p>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {books.map((book) => (
        <div key={book.id} className="flex items-start justify-between border p-4 rounded">
          <div className="flex gap-4">
            <div className="w-24 h-32 bg-gray-200 cursor-pointer" onClick={moveToDetail} />
            <div className="space-y-2">
              <p>
                제목:{' '}
                <span className="font-bold cursor-pointer" onClick={moveToDetail}>
                  {book.title}
                </span>
              </p>
              <p>저자: {book.author}</p>
              <p>내용: {book.contents}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 self-center">
            <button className="h-fit border px-4 py-2 rounded self-center whitespace-nowrap">
              수정
            </button>
            <button className="h-fit border px-4 py-2 rounded self-center whitespace-nowrap">
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
