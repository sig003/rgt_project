export interface BookProps {
  id: number;
  title: string;
  author: string;
  contents: string;
  quantity: number;
  createdAt: string;
  modifiedAt: string;
}

export interface BookResponseProps {
  data: BookProps[];
  total: number;
}

export interface PaginationProps {
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

export interface BookCreateModalProps {
  children: React.ReactNode;
  onCreated?: () => void;
}

export interface SearchHeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
  onCreated: () => void;
}
