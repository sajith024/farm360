import { Component, Inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmComponent } from '../../app-component-utils/delete-confirm/delete-confirm.component';
import { CommunityCommentDetail } from '../../model/community-management/community-query';
import { Profile } from '../../model/dashboard/profile';
import { CommunityManagementService } from '../../service/community-management/community-management.service';
import { LOCAL_STORAGE } from '../../service/local-storage.service';

@Component({
  selector: 'farm360-admin-reply',
  templateUrl: './admin-reply.component.html',
  styleUrl: './admin-reply.component.scss',
})
export class AdminReplyComponent {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private communityManagementService: CommunityManagementService
  ) {}

  @Input()
  comments: CommunityCommentDetail[] = [];

  showForm: boolean = false;

  deleteComment(comment: CommunityCommentDetail): void {
    const modalRef = this.modalService.open(DeleteConfirmComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.content = `Comment by ${comment.created_by.first_name}`;

    modalRef.result.then((result) => {
      if (result) {
        this.communityManagementService.deleteComment(comment.id).subscribe({
          next: () => {
            this.toastr.success('Comment deleted successfully');
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Comment delete failed');
          },
        });
      }
    });
  }

  canEdit(): boolean {
    const user: Profile = JSON.parse(this.localStorage.getItem('profile')!);
    return user.role == 'Admin';
  }
}
