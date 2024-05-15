import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../model/dashboard/profile';
import { UserService } from '../../service/user-management/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { AppHttpParams } from '../../model/app-response';
import { FormControl, FormGroup } from '@angular/forms';

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
  requestParam: FormGroup = new FormGroup({
    search: new FormControl(null),
    sort: new FormControl(null),
  });

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 1,
  };

  totalPaginationPages: number = 0;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.requestParam.value).subscribe({
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

  viewUserInfo(user: Profile): void {
    const modalRef = this.modalService.open(UserInfoComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });

    modalRef.componentInstance.user = user;
  }

  deleteUser(user: Profile): void {
    const modalRef = this.modalService.open(UserDeleteComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });

    modalRef.componentInstance.user = user;
  }
}
