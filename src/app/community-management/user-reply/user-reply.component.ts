import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from '../../app-component-utils/delete-confirm/delete-confirm.component';
import {
  CommunityCommentDetail,
  CommunityCreatedUserDetail,
} from '../../model/community-management/community-query';
import { CommunityManagementService } from '../../service/community-management/community-management.service';
import { LOCAL_STORAGE } from '../../service/local-storage.service';
import { Profile } from '../../model/dashboard/profile';
import { from } from 'rxjs';

@Component({
  selector: 'farm360-user-reply',
  templateUrl: './user-reply.component.html',
  styleUrl: './user-reply.component.scss',
})
export class UserReplyComponent {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private communityManagementService: CommunityManagementService
  ) {}
  queryId!: string;
  queryComment: CommunityCommentDetail[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.queryId = params.get('id')!;
      this.refreshComments();
    });
  }

  refreshComments(): void {
    this.communityManagementService.getComments(this.queryId).subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.queryComment = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving comments failed.');
      },
    });
  }

  getUserComments(): CommunityCommentDetail[] {
    return this.queryComment.filter(
      (value) => value.created_by.role !== 'Admin'
    );
  }

  deleteComment(comment: CommunityCommentDetail): void {
    const modalRef = this.modalService.open(DeleteConfirmComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.content = `Comment by ${comment.created_by.first_name}`;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.communityManagementService.deleteComment(comment.id).subscribe({
            next: () => {
              this.refreshComments();
              this.toastr.success('Comment deleted successfully');
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('Comment delete failed');
            },
          });
        }
      },
      (reason) => {}
    );
  }

  canEdit(createdUser: CommunityCreatedUserDetail): boolean {
    const user: Profile = JSON.parse(this.localStorage.getItem('profile')!);
    return createdUser.id === user.user_id || user.role === 'Admin';
  }
}
