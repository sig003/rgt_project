import { BookResponseProps } from '@/types/book';

export async function getBooks(page: number, limit: number): Promise<BookResponseProps> {
  const res = await fetch(`http://localhost:3001/api/books?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('Fail');
  }

  return res.json();
}

export async function updateBook(
  id: number,
  data: { title: string; author: string; contents: string },
): Promise<void> {
  const res = await fetch(`http://localhost:3001/api/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('수정 실패');
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`http://localhost:3001/api/books/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('삭제 실패');
}

export async function createBook(data: {
  title: string;
  author: string;
  contents: string;
}): Promise<void> {
  const res = await fetch(`http://localhost:3001/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('등록 실패');
}
