import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../model/dashboard/profile';
import { UserService } from '../../service/user-management/user.service';

@Component({
  selector: 'farm360-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss',
})
export class UserDeleteComponent implements OnInit {
  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private elRef: ElementRef,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  @Input() user!: Profile;

  ngOnInit(): void {
    const parentElement: HTMLDivElement =
      this.elRef.nativeElement.closest('.modal-content');
    parentElement.className = 'modal-content itemdelete';
  }

  getName() {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  close(): void {
    this.activeModal.close();
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (res) => {
        this.toastr.success('User deleted successfully');
        this.activeModal.close();
        this.router.navigate(['users']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('User deleted failed');
        this.activeModal.close();
      },
    });
  }
}
