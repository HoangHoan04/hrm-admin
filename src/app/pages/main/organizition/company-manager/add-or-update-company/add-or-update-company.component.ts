import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ROUTES_CONFIG } from '../../../../../core/constants/routes.config';
import { Company } from '../../../../../core/models/organization.models';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  standalone: false,
  selector: 'app-add-or-update-company',
  templateUrl: './add-or-update-company.component.html',
  styleUrls: ['./add-or-update-company.component.scss'],
})
export class AddOrUpdateCompanyComponent implements OnInit {
  id: string | null = null;
  isEdit = false;
  loading = false;
  submitting = false;
  validateForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly message: NzMessageService,
    private readonly apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.loadCompanyDetail(this.id);
    }
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(250)]],
      address: ['', [Validators.maxLength(500)]],
      hotline: ['', [Validators.maxLength(20)]],
      taxCode: ['', [Validators.maxLength(50)]],
      description: [''],
    });
  }

  loadCompanyDetail(id: string): void {
    this.loading = true;
    this.apiService.post<Company>(this.apiService.COMPANY.DETAIL, { id }).subscribe({
      next: (company: Company) => {
        this.validateForm.patchValue({
          id: company.id,
          code: company.code,
          name: company.name,
          address: company.address,
          hotline: company.hotline,
          taxCode: company.taxCode,
          description: company.description,
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.message.error(err.error || 'Không thể tải thông tin chi tiết công ty.');
        this.goBack();
      },
    });
  }

  goBack(): void {
    const basePath = ROUTES_CONFIG.ORGANIZATION.children.COMPANY_MANAGER.path;
    this.router.navigate([basePath]);
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.submitting = true;
    const value = this.validateForm.value;

    const endpoint = this.isEdit ? this.apiService.COMPANY.UPDATE : this.apiService.COMPANY.CREATE;

    this.apiService.post<any>(endpoint, value).subscribe({
      next: () => {
        this.message.success(
          this.isEdit ? 'Cập nhật thông tin công ty thành công!' : 'Thêm mới công ty thành công!',
        );
        this.goBack();
      },
      error: (err: any) => {
        this.message.error(err.error || 'Lưu thông tin thất bại.');
        this.submitting = false;
      },
    });
  }
}
