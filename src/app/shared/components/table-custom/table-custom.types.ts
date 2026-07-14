import { TemplateRef } from '@angular/core';

export interface TableColumn<T = any> {
  field: string;
  header: string;
  width?: string | number;
  body?: TemplateRef<any>; 
  sortable?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  filterMatchMode?: string;
  style?: Record<string, any>;
  headerStyle?: Record<string, any>;
  bodyStyle?: Record<string, any>;
  frozen?: boolean;
  alignFrozen?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  hidden?: boolean;
  resizable?: boolean;
  type?:
    | 'text'
    | 'number'
    | 'currency'
    | 'date'
    | 'datetime'
    | 'boolean'
    | 'badge'
    | 'tag';
  dateFormat?: string;
  currencySymbol?: string;
  numberFormat?: string; // e.g. '1.0-2' for DecimalPipe
  badgeSeverity?: (value: any) => 'success' | 'info' | 'warning' | 'danger' | 'secondary';
  tagSeverity?: (value: any) => 'success' | 'info' | 'warning' | 'danger' | 'secondary';
  renderBoolean?: (value: boolean) => string;
  renderEmpty?: () => string;
}

export interface FilterMeta {
  [field: string]: {
    value: any;
    matchMode?: string;
  };
}

export interface RowAction<T = any> {
  key: string;
  label?: string;
  icon?: string; // nz-icon type
  tooltip?: string;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'primary';
  onClick?: (record: T, index: number) => void;
  disabled?: boolean | ((record: T) => boolean);
  visible?: boolean | ((record: T) => boolean);
  loading?: boolean | ((record: T) => boolean);
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showTotal?: boolean;
}

export interface ToolbarConfig {
  show?: boolean;
  align?: 'left' | 'center' | 'right' | 'between';
  showRefreshButton?: boolean;
}
