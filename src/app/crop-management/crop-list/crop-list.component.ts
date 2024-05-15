import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { CropInfo } from '../../model/crop-management/crop-info';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';
import { CropDeleteComponent } from '../crop-delete/crop-delete.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'farm360-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.scss',
})
export class CropListComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cropManagementService: CropManagementServiceService
  ) {}

  crops: CropInfo[] = [];

  requestParam: FormGroup = new FormGroup({
    search: new FormControl(null),
    sort: new FormControl(null),
  });

  public config: PaginationInstance = {
    id: 'cropList',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 1,
  };

  totalPaginationPages: number = 0;

  ngOnInit(): void {
    this.getCropList();
  }

  getCropList() {
    this.cropManagementService.getCrops(this.requestParam.value).subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.crops = res.data.results;
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

  deleteCrop(crop: CropInfo): void {
    const modalRef = this.modalService.open(CropDeleteComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.crop = crop;
  }
}
