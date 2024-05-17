import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PaginationControlsDirective,
  PaginationInstance,
} from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from '../app-component-utils/delete-confirm/delete-confirm.component';
import { CommunityQueryDetail } from '../model/community-management/community-query';
import { CommunityManagementService } from '../service/community-management/community-management.service';

@Component({
  selector: 'farm360-community-management',
  templateUrl: './community-management.component.html',
  styleUrl: './community-management.component.scss',
})
export class CommunityManagementComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private communityManagementService: CommunityManagementService
  ) {}

  community_queries: CommunityQueryDetail[] = [];

  requestParam: FormGroup = new FormGroup({
    search: new FormControl(null),
    sort: new FormControl(null),
    page: new FormControl(null),
  });

  public config: PaginationInstance = {
    id: 'communityQueries',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1,
  };

  totalPaginationPages: number = 0;

  ngOnInit(): void {
    this.getQueries();
  }

  getQueries(): void {
    this.communityManagementService
      .getQueries(this.requestParam.value)
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200 && res.success) {
            this.community_queries = res.data.results;
            this.config.currentPage = res.data.pagination.page;
            this.config.totalItems = res.data.pagination.count;
            this.totalPaginationPages = res.data.pagination.total_pages;
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Retrieving queries failed.');
        },
      });
  }

  deleteQuery(query: CommunityQueryDetail): void {
    const modalRef = this.modalService.open(DeleteConfirmComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.content = query.title;

    modalRef.result.then((result) => {
      if (result) {
        this.communityManagementService.deleteQuery(query.id).subscribe({
          next: () => {
            this.getQueries();
            this.toastr.success('Query deleted successfully');
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Query delete failed');
          },
        });
      }
    });
  }

  moveCurrentPage(pagination: PaginationControlsDirective, page: number): void {
    pagination.setCurrent(page);
    this.requestParam.get('page')?.setValue(page);
    this.getQueries();
  }

  previousPage(pagination: PaginationControlsDirective): void {
    pagination.previous();
    this.requestParam.get('page')?.setValue(this.config.currentPage);
    this.getQueries();
  }

  nextPage(pagination: PaginationControlsDirective): void {
    pagination.next();
    this.requestParam.get('page')?.setValue(this.config.currentPage);
    this.getQueries();
  }
}
