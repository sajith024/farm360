import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from '../../service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'farm360-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private router: Router,
    private elRef: ElementRef,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    const parentElement: HTMLDivElement =
      this.elRef.nativeElement.closest('.modal-content');
    parentElement.className = 'modal-content itemdelete';
  }

  close(): void {
    this.activeModal.close();
  }

  logout(): void {
    this.localStorage.clear();
    this.activeModal.close();
    this.router.navigate(['auth', 'login']);
  }
}
