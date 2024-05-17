import { Component, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'farm360-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.scss',
})
export class DeleteConfirmComponent {
  constructor(private activeModal: NgbActiveModal, private elRef: ElementRef) {}

  @Input() content: string = '';

  ngOnInit(): void {
    const parentElement: HTMLDivElement =
      this.elRef.nativeElement.closest('.modal-content');
    parentElement.className = 'modal-content itemdelete';
  }

  close(confirm: boolean): void {
    this.activeModal.close(confirm);
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
