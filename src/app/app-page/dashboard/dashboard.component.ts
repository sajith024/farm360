import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { DashboardStats } from '../../model/dashboard/dashboard-stats';

@Component({
  selector: 'farm360-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private dashboardService: DashboardService
  ) {}

  dashboardStats: DashboardStats = {
    total_users: 0,
    total_crops: 0,
  };

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.dashboardStats = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error on getting stats.');
      },
    });
  }
}
