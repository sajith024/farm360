import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../service/dashboard/dashboard.service';

@Component({
  selector: 'farm360-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private toastr: ToastrService,
    private dashboardService: DashboardService
  ) {}
}
