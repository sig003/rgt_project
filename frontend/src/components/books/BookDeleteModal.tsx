'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { BookDeleteModalProps } from '@/types/book';
import { useState, useRef } from 'react';
import { deleteBook } from '@/libs/api';

export default function BookDeleteModal({ book, children, onDeleted }: BookDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBook(book.id);
      alert('삭제 완료');
      onDeleted?.();
      closeRef.current?.click();
    } catch (e) {
      console.error(e);
      alert('삭제 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 justify-between">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-bold"
          >
            삭제
          </button>
          <DialogClose asChild>
            <button
              ref={closeRef}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 font-bold"
            >
              취소
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
