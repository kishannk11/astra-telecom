import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth';
import { TelecomDataService, Subscriber, NetworkStat, RevenueData, Alert } from '../services/telecom-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  activeSection = 'overview';

  kpi: any = {};
  subscribers: Subscriber[] = [];
  networkStats: NetworkStat[] = [];
  revenueData: RevenueData[] = [];
  alerts: Alert[] = [];

  subscriberFilter = 'All';
  filterOptions = ['All', 'Active', 'Inactive', 'Suspended'];
  searchTerm = '';
  sidebarOpen = true;

  planDistribution = [
    { name: 'Enterprise 5G', pct: 30, color: '#4da6ff' },
    { name: 'Business Pro',  pct: 30, color: '#a78bfa' },
    { name: 'Home Fiber',    pct: 20, color: '#34d399' },
    { name: 'Starter 4G',   pct: 20, color: '#fb923c' },
  ];

  constructor(
    private auth: AuthService,
    private dataService: TelecomDataService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = this.auth.getCurrentUser();
    this.dataService.getKpiSummary().subscribe(data => this.kpi = data);
    this.dataService.getSubscribers().subscribe(data => this.subscribers = data);
    this.dataService.getNetworkStats().subscribe(data => this.networkStats = data);
    this.dataService.getRevenueData().subscribe(data => this.revenueData = data);
    this.dataService.getAlerts().subscribe(data => this.alerts = data);
  }

  logout() { this.auth.logout(); }
  setSection(section: string) { this.activeSection = section; }

  get filteredSubscribers(): Subscriber[] {
    return this.subscribers.filter(s => {
      const matchesFilter = this.subscriberFilter === 'All' || s.status === this.subscriberFilter;
      const matchesSearch = !this.searchTerm ||
        s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.phone.includes(this.searchTerm) ||
        s.plan.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  getDataPercent(used: number, limit: number): number {
    return Math.min(Math.round((used / limit) * 100), 100);
  }

  getBarHeight(revenue: number): number {
    const max = Math.max(...this.revenueData.map(r => r.revenue));
    return Math.round((revenue / max) * 100);
  }

  formatRevenue(val: number): string {
    if (!val) return '—';
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000)   return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${val.toLocaleString()}`;
  }

  getStatusClass(status: string): string {
    return ({ 'Active': 'badge-active', 'Inactive': 'badge-inactive', 'Suspended': 'badge-suspended' } as any)[status] || '';
  }

  getAlertClass(type: string): string {
    return ({ error: 'alert-error', warning: 'alert-warning', info: 'alert-info', success: 'alert-success' } as any)[type] || '';
  }

  getAlertIcon(type: string): string {
    return ({ error: '🔴', warning: '🟡', info: '🔵', success: '🟢' } as any)[type] || '⚪';
  }
}
