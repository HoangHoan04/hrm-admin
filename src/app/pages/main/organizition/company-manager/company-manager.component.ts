import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableColumn, RowAction, PaginationConfig } from '../../../../shared/components/table-custom/table-custom.types';
import { ApiService } from '../../../../core/services/api.service';
import { Company } from '../../../../core/models/organization.models';
import { PagedResult, PagedRequest } from '../../../../core/models/common.models';

@Component({
  standalone: false,
  selector: 'app-company-manager',
  templateUrl: './company-manager.component.html',
  styleUrls: ['./company-manager.component.scss']
})
export class CompanyManagerComponent implements OnInit {
  data: (Company & { status?: boolean })[] = [];
  loading = false;

  // Cấu hình phân trang server-side
  pagination: PaginationConfig = {
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: true
  };

  searchText = '';
  sortField = 'createdAt';
  sortOrder = 'desc';

  columns: TableColumn[] = [
    { field: 'code', header: 'Mã công ty', type: 'text', sortable: true },
    { field: 'name', header: 'Tên công ty', type: 'text', sortable: true },
    { field: 'address', header: 'Địa chỉ trụ sở', type: 'text', sortable: true },
    { field: 'hotline', header: 'Điện thoại/Hotline', type: 'text' },
    { field: 'taxCode', header: 'Mã số thuế', type: 'text' },
    { field: 'status', header: 'Trạng thái', type: 'boolean', sortable: true },
    { field: 'createdAt', header: 'Ngày hoạt động', type: 'date', sortable: true }
  ];

  rowActions: RowAction[] = [
    {
      key: 'edit',
      icon: 'edit',
      tooltip: 'Sửa công ty',
      severity: 'info',
      onClick: (record) => this.router.navigate(['/organization/company/edit', record.id])
    },
    {
      key: 'toggleStatus',
      icon: 'sync',
      tooltip: 'Kích hoạt / Khóa',
      severity: 'warning',
      onClick: (record) => this.toggleStatus(record)
    }
  ];

  constructor(
    private readonly router: Router,
    private readonly message: NzMessageService,
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.apiService.post<PagedResult<Company>>(this.apiService.COMPANY.PAGINATION, {
      pageIndex: this.pagination.current,
      pageSize: this.pagination.pageSize,
      searchText: this.searchText,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    }).subscribe({
      next: (res) => {
        this.data = res.items.map(item => ({
          ...item,
          status: !item.isDeleted
        }));
        this.pagination.total = res.totalCount;
        this.loading = false;
      },
      error: (err: any) => {
        this.message.error(err.error || 'Không thể tải danh sách doanh nghiệp.');
        this.loading = false;
      }
    });
  }

  onPageChange(event: { page: number; pageSize: number }): void {
    this.pagination.current = event.page;
    this.pagination.pageSize = event.pageSize;
    this.loadData();
  }

  onSortChange(event: { sortField: string | null; sortOrder: 1 | -1 | 0 | null }): void {
    this.sortField = event.sortField || 'createdAt';
    this.sortOrder = event.sortOrder === 1 ? 'asc' : event.sortOrder === -1 ? 'desc' : 'desc';
    this.loadData();
  }

  toggleStatus(company: Company): void {
    if (!company.id) return;
    this.loading = true;

    const endpoint = company.isDeleted
      ? this.apiService.COMPANY.ACTIVATE
      : this.apiService.COMPANY.DEACTIVATE;

    this.apiService.post<boolean>(endpoint, { id: company.id }).subscribe({
      next: (success) => {
        if (success) {
          this.message.success(
            company.isDeleted
              ? 'Kích hoạt hoạt động công ty thành công!'
              : 'Khóa hoạt động công ty thành công!'
          );
          this.loadData();
        } else {
          this.message.error('Không thể thay đổi trạng thái.');
          this.loading = false;
        }
      },
      error: (err: any) => {
        this.message.error(err.error || 'Có lỗi xảy ra.');
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.router.navigate(['/organization/company/add']);
  }
}
