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
import { useRef, useState } from 'react';
import { createBook } from '@/libs/api';
import { BookCreateModalProps } from '@/types/book';

export default function BookCreateModal({ children, onCreated }: BookCreateModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [contents, setContents] = useState('');
  const [loading, setLoading] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createBook({ title, author, contents });
      onCreated?.();
      closeRef.current?.click();
      setTitle('');
      setAuthor('');
      setContents('');
    } catch (e) {
      console.error(e);
      alert('등록 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>등록</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="저자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="내용"
            rows={4}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <button
              ref={closeRef}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              취소
            </button>
          </DialogClose>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
            disabled={loading}
          >
            등록
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
