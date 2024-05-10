import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'farm360-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss',
})
export class UserDeleteComponent implements OnInit {
  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    const parentElement: HTMLDivElement =
      this.elRef.nativeElement.closest('.modal-content');
    parentElement.className = 'modal-content itemdelete';
  }

  close(): void {
    this.activeModal.close();
  }

  deleteUser(): void {
    this.activeModal.close();
    this.router.navigate(['users']);
  }
}
