import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService, DashboardSettings } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  s: DashboardSettings;
  private sub = new Subscription();

  watermarkTiles: number[] = [];

  constructor(private ds: DashboardService) {
    this.s = ds.snapshot;
  }

  ngOnInit(): void {
    this.sub.add(
      this.ds.settings$.subscribe((settings) => {
        this.s = settings;
        this.updateWatermarkTiles();
      }),
    );
    this.updateWatermarkTiles();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateWatermarkTiles(): void {
    const cols = Math.ceil(window.innerWidth / 180);
    const rows = Math.ceil(window.innerHeight / 140);
    this.watermarkTiles = Array.from({ length: cols * rows }, (_, i) => i);
  }
}
