import { BookResponseProps } from '@/types/book';
import { API_URL } from './constants';

export async function getBooks(
  page: number,
  limit: number,
  search = '',
): Promise<BookResponseProps> {
  const res = await fetch(
    `${API_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
  );
  if (!res.ok) {
    throw new Error('Fail');
  }

  return res.json();
}

export async function updateBook(
  id: number,
  data: { title: string; author: string; quantity: number; contents: string },
): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('수정 실패');
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('삭제 실패');
}

export async function createBook(data: {
  title: string;
  author: string;
  contents: string;
  quantity: number;
}): Promise<void> {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('등록 실패');
}
