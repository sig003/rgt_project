'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BookDetailModalProps } from '@/types/book';
import { translateDateFormat } from '@/libs/common';

export default function BookDetailModal({ book, children }: BookDetailModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{book.title}</DialogTitle>
          <DialogDescription>{book.contents}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4 text-sm">
          <p>
            저자: <strong>{book.author}</strong>
          </p>
          <p>
            수량: <strong>{book.quantity}</strong>
          </p>
          <p>
            등록일: <strong>{translateDateFormat(book.createdAt)}</strong>
          </p>
          <p>
            수정일: <strong>{translateDateFormat(book.modifiedAt)}</strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
