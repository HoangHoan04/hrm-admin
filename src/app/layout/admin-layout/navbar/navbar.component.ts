import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService, DashboardSettings } from '../../../core/services/dashboard.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  s: DashboardSettings;
  collapsed = false;
  username = 'Hoàng Văn Nam';
  email = 'nam@example.com';
  private sub = new Subscription();

  constructor(
    private sidebarService: SidebarService,
    private dashboardService: DashboardService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.s = dashboardService.snapshot;
    this.sidebarService.collapsed$.subscribe((v) => (this.collapsed = v));
  }

  ngOnInit(): void {
    this.sub.add(
      this.dashboardService.settings$.subscribe((settings) => {
        this.s = settings;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  openSettings(): void {
    this.dashboardService.setConfigOpen(true);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
