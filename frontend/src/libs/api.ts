import { BookResponse } from '@/types/book';

export async function getBooks(page, limit): Promise<BookResponse> {
  const res = await fetch(`http://localhost:3001/api/books?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('Fail');
  }

  return res.json();
}
