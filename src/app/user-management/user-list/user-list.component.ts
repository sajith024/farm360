import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../model/dashboard/profile';
import { UserService } from '../../service/user-management/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'farm360-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  users: Profile[] = [];

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 1,
  };

  totalPaginationPages: number = 0;

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.users = res.data.results;
          this.config.itemsPerPage = res.data.results.length;
          this.config.currentPage = res.data.pagination.page;
          this.config.totalItems = res.data.pagination.count;
          this.totalPaginationPages = res.data.pagination.total_pages;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving user list failed.');
      },
    });
  }

  deleteUser(id: number): void {
    this.modalService.open(UserDeleteComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });
  }
}
