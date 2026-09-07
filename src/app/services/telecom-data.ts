import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  plan: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  dataUsed: number;
  dataLimit: number;
  joinDate: string;
  region: string;
  monthlyBill: number;
}

export interface NetworkStat {
  region: string;
  uptime: number;
  latency: number;
  activeUsers: number;
  towers: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
  churn: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  time: string;
  region?: string;
}

@Injectable({ providedIn: 'root' })
export class TelecomDataService {

  private subscribers: Subscriber[] = [
    { id: 'S001', name: 'Arjun Sharma', phone: '+91-98765-43210', plan: 'Enterprise 5G', status: 'Active', dataUsed: 42.3, dataLimit: 100, joinDate: '2023-03-15', region: 'North', monthlyBill: 2499 },
    { id: 'S002', name: 'Priya Nair', phone: '+91-87654-32109', plan: 'Business Pro', status: 'Active', dataUsed: 18.7, dataLimit: 50, joinDate: '2022-11-08', region: 'South', monthlyBill: 1299 },
    { id: 'S003', name: 'Ravi Kumar', phone: '+91-76543-21098', plan: 'Home Fiber', status: 'Suspended', dataUsed: 0, dataLimit: 200, joinDate: '2021-06-20', region: 'West', monthlyBill: 799 },
    { id: 'S004', name: 'Sunita Verma', phone: '+91-65432-10987', plan: 'Enterprise 5G', status: 'Active', dataUsed: 88.1, dataLimit: 100, joinDate: '2024-01-12', region: 'East', monthlyBill: 2499 },
    { id: 'S005', name: 'Manoj Patel', phone: '+91-54321-09876', plan: 'Starter 4G', status: 'Active', dataUsed: 7.2, dataLimit: 20, joinDate: '2024-07-03', region: 'North', monthlyBill: 399 },
    { id: 'S006', name: 'Kavita Singh', phone: '+91-43210-98765', plan: 'Business Pro', status: 'Inactive', dataUsed: 0, dataLimit: 50, joinDate: '2023-09-25', region: 'South', monthlyBill: 1299 },
    { id: 'S007', name: 'Deepak Mehta', phone: '+91-32109-87654', plan: 'Home Fiber', status: 'Active', dataUsed: 155.4, dataLimit: 200, joinDate: '2022-04-17', region: 'West', monthlyBill: 799 },
    { id: 'S008', name: 'Anjali Gupta', phone: '+91-21098-76543', plan: 'Enterprise 5G', status: 'Active', dataUsed: 65.9, dataLimit: 100, joinDate: '2023-12-01', region: 'East', monthlyBill: 2499 },
    { id: 'S009', name: 'Rohit Joshi', phone: '+91-10987-65432', plan: 'Starter 4G', status: 'Active', dataUsed: 14.8, dataLimit: 20, joinDate: '2024-05-19', region: 'North', monthlyBill: 399 },
    { id: 'S010', name: 'Meena Iyer', phone: '+91-09876-54321', plan: 'Business Pro', status: 'Active', dataUsed: 33.5, dataLimit: 50, joinDate: '2023-02-28', region: 'South', monthlyBill: 1299 },
  ];

  private networkStats: NetworkStat[] = [
    { region: 'North', uptime: 99.8, latency: 12, activeUsers: 142500, towers: 1240 },
    { region: 'South', uptime: 99.5, latency: 15, activeUsers: 198300, towers: 1680 },
    { region: 'East', uptime: 98.9, latency: 18, activeUsers: 87400, towers: 890 },
    { region: 'West', uptime: 99.7, latency: 11, activeUsers: 165200, towers: 1420 },
    { region: 'Central', uptime: 99.2, latency: 14, activeUsers: 112700, towers: 980 },
  ];

  private revenueData: RevenueData[] = [
    { month: 'Apr', revenue: 48200000, subscriptions: 2150, churn: 210 },
    { month: 'May', revenue: 51300000, subscriptions: 2380, churn: 185 },
    { month: 'Jun', revenue: 49800000, subscriptions: 1980, churn: 230 },
    { month: 'Jul', revenue: 54700000, subscriptions: 2650, churn: 160 },
    { month: 'Aug', revenue: 57100000, subscriptions: 2890, churn: 145 },
    { month: 'Sep', revenue: 61400000, subscriptions: 3120, churn: 130 },
    { month: 'Oct', revenue: 59800000, subscriptions: 2740, churn: 175 },
    { month: 'Nov', revenue: 63200000, subscriptions: 3350, churn: 120 },
    { month: 'Dec', revenue: 71500000, subscriptions: 4100, churn: 95 },
    { month: 'Jan', revenue: 65300000, subscriptions: 2980, churn: 150 },
    { month: 'Feb', revenue: 68700000, subscriptions: 3240, churn: 115 },
    { month: 'Mar', revenue: 74200000, subscriptions: 3890, churn: 88 },
  ];

  private alerts: Alert[] = [
    { id: 'A001', type: 'error', message: 'Tower TW-4521 (East Region) offline — investigating', time: '2 mins ago', region: 'East' },
    { id: 'A002', type: 'warning', message: 'High latency detected in South Mumbai cluster', time: '18 mins ago', region: 'South' },
    { id: 'A003', type: 'info', message: 'Scheduled maintenance: North Delhi zone on Sep 10, 02:00–04:00', time: '1 hr ago', region: 'North' },
    { id: 'A004', type: 'success', message: 'West Region 5G rollout Phase 3 completed successfully', time: '3 hrs ago', region: 'West' },
    { id: 'A005', type: 'warning', message: 'Billing batch job delayed — ETA 30 minutes', time: '4 hrs ago' },
  ];

  getSubscribers(): Observable<Subscriber[]> {
    return of(this.subscribers);
  }

  getNetworkStats(): Observable<NetworkStat[]> {
    return of(this.networkStats);
  }

  getRevenueData(): Observable<RevenueData[]> {
    return of(this.revenueData);
  }

  getAlerts(): Observable<Alert[]> {
    return of(this.alerts);
  }

  getKpiSummary() {
    return of({
      totalSubscribers: 706100,
      activeSubscribers: 689430,
      monthlyRevenue: 74200000,
      networkUptime: 99.42,
      newSubscribersThisMonth: 3890,
      supportTickets: 1247,
      avgDataUsageGB: 28.4,
      npsScore: 68,
    });
  }
}
