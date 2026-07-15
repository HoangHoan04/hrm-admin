import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ROUTES_CONFIG } from '../../../../../core/constants/routes.config';

interface CompanyDetailMock {
  id: string;
  code: string;
  name: string;
  address: string;
  hotline: string;
  taxCode: string;
  description: string;
  createdAt: string;
  status: boolean;
}

@Component({
  standalone: false,
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  id: string | null = null;
  loading = false;
  company: CompanyDetailMock | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly message: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadCompanyDetail(this.id);
    }
  }

  loadCompanyDetail(id: string): void {
    this.loading = true;
    setTimeout(() => {
      this.company = {
        id,
        code: 'HOANGHOAN-TECH',
        name: 'CÔNG TY TNHH CÔNG NGHỆ HOÀNG HOAN',
        address: 'Số 123 Đường Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội',
        hotline: '0987654321',
        taxCode: '0109123456',
        description: 'Đơn vị cung cấp giải pháp chuyển đổi số toàn diện cho doanh nghiệp.',
        createdAt: '2026-01-10T08:00:00Z',
        status: true,
      };
      this.loading = false;
    }, 200);
  }

  goBack(): void {
    const basePath = ROUTES_CONFIG.ORGANIZATION.children.COMPANY_MANAGER.path;
    this.router.navigate([basePath]);
  }
}
