import { Book } from '@/types/book';

export async function getBooks(): Promise<Book[]> {
  const res = await fetch('http://localhost:3001/api/books');

  if (!res.ok) {
    throw new Error('Fail');
  }

  return res.json();
}
