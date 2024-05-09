import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DashboardService } from '../../service/dashboard/dashboard.service';
import { LogoutComponent } from '../../app-auth/logout/logout.component';
import { Profile } from '../../model/dashboard/profile';

@Component({
  selector: 'farm360-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private dashboardService: DashboardService
  ) {}

  profile?: Profile;

  ngOnInit(): void {
    this.dashboardService.getUserProfile().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.profile = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error on getting profile.');
      },
    });
  }

  logout(): void {
    this.modalService.open(LogoutComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });
  }
}
