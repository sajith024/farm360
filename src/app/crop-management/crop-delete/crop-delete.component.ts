import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CropInfo } from '../../model/crop-management/crop-info';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';

@Component({
  selector: 'farm360-crop-delete',
  templateUrl: './crop-delete.component.html',
  styleUrl: './crop-delete.component.scss',
})
export class CropDeleteComponent {
  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private elRef: ElementRef,
    private toastr: ToastrService,
    private cropManagementService: CropManagementServiceService
  ) {}

  @Input() crop!: CropInfo;

  ngOnInit(): void {
    const parentElement: HTMLDivElement =
      this.elRef.nativeElement.closest('.modal-content');
    parentElement.className = 'modal-content itemdelete';
  }

  getName() {
    return this.crop.name;
  }

  close(): void {
    this.activeModal.close();
  }

  deleteCrop(): void {
    this.cropManagementService.deleteCrop(this.crop.id).subscribe({
      next: (res) => {
        this.toastr.success('Crop deleted successfully');
        this.activeModal.close();
        this.router.navigate(['crops']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Crop deleted failed');
        this.activeModal.close();
      },
    });
  }
}
