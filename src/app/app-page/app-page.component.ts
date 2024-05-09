import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from '../app-auth/logout/logout.component';

@Component({
  selector: 'farm360-app-page',
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
})
export class AppPageComponent {
  constructor(private modalService: NgbModal) {}

  logout(): void {
    this.modalService.open(LogoutComponent, {
      centered: true,
      size: 'lg',
      modalDialogClass: 'userlogout',
    });
  }
}
