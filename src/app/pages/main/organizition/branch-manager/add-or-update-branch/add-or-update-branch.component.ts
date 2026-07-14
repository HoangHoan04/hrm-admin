import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../../../../core/services/api.service';
import { Branch, CompanySelectBoxDto } from '../../../../../core/models/organization.models';

@Component({
  standalone: false,
  selector: 'app-add-or-update-branch',
  templateUrl: './add-or-update-branch.component.html',
  styleUrls: ['./add-or-update-branch.component.scss']
})
export class AddOrUpdateBranchComponent implements OnInit {
  id: string | null = null;
  isEdit = false;
  loading = false;
  submitting = false;
  validateForm!: FormGroup;
  companies: CompanySelectBoxDto[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly message: NzMessageService,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    this.loadCompanies();

    if (this.isEdit && this.id) {
      this.loadBranchDetail(this.id);
    }
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(250)]],
      address: ['', [Validators.maxLength(500)]],
      ipAddress: ['', [Validators.maxLength(100)]],
      companyId: [null, [Validators.required]],
      description: [''],
      shortName: [''],
      type: [''],
      groupSalary: ['']
    });
  }

  loadCompanies(): void {
    this.apiService.post<CompanySelectBoxDto[]>(this.apiService.COMPANY.SELECT_BOX, {}).subscribe({
      next: (res: CompanySelectBoxDto[]) => {
        this.companies = res;
        if (!this.isEdit && this.companies.length > 0 && !this.validateForm.value.companyId) {
          this.validateForm.patchValue({ companyId: this.companies[0].id });
        }
      },
      error: () => {
        this.message.error('Không thể tải danh sách công ty để chọn.');
      }
    });
  }

  loadBranchDetail(id: string): void {
    this.loading = true;
    this.apiService.post<Branch>(this.apiService.BRANCH.DETAIL, { id }).subscribe({
      next: (branch: Branch) => {
        this.validateForm.patchValue({
          id: branch.id,
          code: branch.code,
          name: branch.name,
          address: branch.address,
          ipAddress: branch.ipAddress,
          companyId: branch.companyId,
          description: branch.description,
          shortName: branch.shortName,
          type: branch.type,
          groupSalary: branch.groupSalary
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.message.error(err.error || 'Không thể tải chi tiết chi nhánh.');
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/organization/branch']);
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.submitting = true;
    const value = this.validateForm.value;

    const endpoint = this.isEdit
      ? this.apiService.BRANCH.UPDATE
      : this.apiService.BRANCH.CREATE;

    this.apiService.post<any>(endpoint, value).subscribe({
      next: () => {
        this.message.success(
          this.isEdit
            ? 'Cập nhật chi nhánh thành công!'
            : 'Thêm mới chi nhánh thành công!'
        );
        this.goBack();
      },
      error: (err: any) => {
        this.message.error(err.error || 'Lưu thông tin thất bại.');
        this.submitting = false;
      }
    });
  }
}
