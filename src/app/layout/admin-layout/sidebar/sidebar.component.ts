import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ROUTES_CONFIG,
  SidebarMenuItem,
  convertRoutesToMenuItems,
} from '../../../core/constants/routes.config';
import { DashboardService, DashboardSettings } from '../../../core/services/dashboard.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  collapsed = false;
  s: DashboardSettings;
  menuItems: SidebarMenuItem[] = [];
  private sub = new Subscription();

  constructor(
    private sidebarService: SidebarService,
    private ds: DashboardService,
  ) {
    this.s = ds.snapshot;
    this.sidebarService.collapsed$.subscribe((v) => (this.collapsed = v));
    this.menuItems = convertRoutesToMenuItems(ROUTES_CONFIG);
  }

  ngOnInit(): void {
    this.sub.add(
      this.ds.settings$.subscribe((settings) => {
        this.s = settings;
        this.sidebarService.setCollapsed(settings.collapseSidebar);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get sidebarWidth(): number {
    return this.collapsed ? this.s.sidebarCollapsedWidth : this.s.sidebarWidth;
  }

  get isDark(): boolean {
    return (
      this.s.theme === 'dark' ||
      (this.s.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }
}
