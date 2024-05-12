import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '../../model/dashboard/profile';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'farm360-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  @Input() user!: Profile;

  getName() {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  close(): void {
    this.activeModal.close();
  }

  editUser(): void {
    this.close();
    this.router.navigate(['users', 'edit', this.user.id]);
  }

  deleteUser(): void {
    const modalRef = this.modalService.open(UserDeleteComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });

    modalRef.componentInstance.user = this.user;
  }
}
