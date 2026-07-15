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

export type CompanySelectBoxDto = SelectBoxDto;

export interface BranchSelectBoxDto extends SelectBoxDto {
  companyId?: string;
}
