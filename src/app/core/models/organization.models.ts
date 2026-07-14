/**
 * Models cho module Tổ chức: Công ty & Chi nhánh.
 * Các DTO dùng riêng cho module này được khai báo tại đây.
 */
import { SelectBoxDto } from './common.models';

export interface Company {
  id?: string;
  code: string;
  name: string;
  description?: string;
  address?: string;
  taxCode?: string;
  hotline?: string;
  isDeleted?: boolean;
  createdAt?: string;
}

export interface Branch {
  id?: string;
  code: string;
  name: string;
  description: string;
  address: string;
  ipAddress: string;
  groupSalary: string;
  shortName: string;
  type: string;
  companyId?: string;
  companyName?: string;
  isDeleted?: boolean;
  createdAt?: string;
}

/** SelectBox dùng cho dropdown chọn công ty */
export type CompanySelectBoxDto = SelectBoxDto;

/** SelectBox dùng cho dropdown chọn chi nhánh */
export interface BranchSelectBoxDto extends SelectBoxDto {
  companyId?: string;
}
