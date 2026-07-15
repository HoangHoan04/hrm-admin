import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: false,
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.scss'],
})
export class ActionLogComponent implements OnInit, OnChanges {
  @Input() entityName!: string;
  @Input() entityId?: string;

  logs: any[] = [];
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  selectedLog: any = null;
  modalVisible = false;
  oldValueObj: any = null;
  newValueObj: any = null;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    if (this.entityName) {
      this.loadLogs();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['entityName'] || changes['entityId']) &&
      !changes['entityName']?.firstChange &&
      !changes['entityId']?.firstChange
    ) {
      this.pageIndex = 1;
      this.loadLogs();
    }
  }

  loadLogs(): void {
    this.loading = true;
    const url =
      `${this.apiService.ACTION_LOG.BASE}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}` +
      `&entityName=${this.entityName}` +
      `${this.entityId ? '&entityId=' + this.entityId : ''}`;

    this.apiService.get<any>(url).subscribe({
      next: (res) => {
        this.loading = false;
        if (res) {
          this.logs = res.items || [];
          this.total = res.totalCount || 0;
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadLogs();
  }

  viewDetails(log: any): void {
    this.selectedLog = log;
    this.oldValueObj = null;
    this.newValueObj = null;

    if (log.oldValue) {
      try {
        this.oldValueObj = JSON.parse(log.oldValue);
      } catch {
        this.oldValueObj = log.oldValue;
      }
    }

    if (log.newValue) {
      try {
        this.newValueObj = JSON.parse(log.newValue);
      } catch {
        this.newValueObj = log.newValue;
      }
    }

    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedLog = null;
  }

  getAllKeys(): string[] {
    const keys = new Set<string>();
    if (this.oldValueObj && typeof this.oldValueObj === 'object') {
      Object.keys(this.oldValueObj).forEach((k) => keys.add(k));
    }
    if (this.newValueObj && typeof this.newValueObj === 'object') {
      Object.keys(this.newValueObj).forEach((k) => keys.add(k));
    }
    return Array.from(keys);
  }

  formatVal(val: any): string {
    if (val === null || val === undefined) return '-';
    if (typeof val === 'object') return JSON.stringify(val);
    if (typeof val === 'boolean') return val ? 'Có' : 'Không';
    return String(val);
  }

  isDifferent(key: string): boolean {
    const oldV = this.oldValueObj ? this.oldValueObj[key] : undefined;
    const newV = this.newValueObj ? this.newValueObj[key] : undefined;
    return JSON.stringify(oldV) !== JSON.stringify(newV);
  }
}
