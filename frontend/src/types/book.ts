export interface BookProps {
  id: number;
  title: string;
  author: string;
  contents: string;
  createdAt: string;
  modifiedAt: string;
}

export interface BookResponseProps {
  data: BookProps[];
  total: number;
}

export interface PagingProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export interface BookDetailModalProps {
  book: BookProps;
  children: React.ReactNode;
}

export interface BookEditModalProps {
  book: BookProps;
  children: React.ReactNode;
  onUpdated?: () => void;
}

export interface BookDeleteModalProps {
  book: BookProps;
  children: React.ReactNode;
  onDeleted?: () => void;
}
