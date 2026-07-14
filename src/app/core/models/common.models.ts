/**
 * Kiểu dữ liệu dùng chung cho toàn bộ ứng dụng.
 * Mọi DTO/Type/Interface dùng ở nhiều nơi đều phải khai báo tại đây.
 */

/** Kết quả phân trang từ server */
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

/** Tham số gửi lên server để lấy dữ liệu phân trang */
export interface PagedRequest {
  pageIndex: number;
  pageSize: number;
  searchText?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

/** Kết quả trả về khi thực hiện thao tác CRUD đơn giản */
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
}

/** Kiểu dùng chung cho Select Box (dropdown) */
export interface SelectBoxDto {
  id: string;
  name: string;
  code?: string;
}
