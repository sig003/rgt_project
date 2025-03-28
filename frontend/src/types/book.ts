export interface Book {
  id: number;
  title: string;
  author: string;
  contents: string;
  createdAt: string;
  modifiedAt: string;
}

export interface BookRespose {
  data: Book[];
  total: number;
}

export interface Paging {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}
