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
import { useRef, useState, useEffect } from 'react';
import { createBook } from '@/libs/api';
import { BookCreateModalProps } from '@/types/book';

export default function BookCreateModal({ children, onCreated }: BookCreateModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [contents, setContents] = useState('');
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setAuthor('');
      setContents('');
      setQuantity(0);
    }
  }, [open]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      if (!title.trim()) {
        alert('제목을 입력해 주세요.');
        titleRef.current?.focus();
        return;
      }
      if (!author.trim()) {
        alert('저자를 입력해 주세요.');
        authorRef.current?.focus();
        return;
      }

      if (!contents.trim()) {
        alert('내용을 입력해 주세요.');
        contentsRef.current?.focus();
        return;
      }
      await createBook({ title, author, contents, quantity });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>등록</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            ref={titleRef}
            className="w-full border p-2 rounded"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            ref={authorRef}
            className="w-full border p-2 rounded"
            placeholder="저자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="수량"
            className="w-full border p-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <textarea
            ref={contentsRef}
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
