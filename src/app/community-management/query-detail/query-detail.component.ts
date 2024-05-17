import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CommunityCommentDetail,
  CommunityQuery,
  CommunityQueryDetail,
} from '../../model/community-management/community-query';
import { CommunityManagementService } from '../../service/community-management/community-management.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'farm360-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrl: './query-detail.component.scss',
})
export class QueryDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private communityManagementService: CommunityManagementService
  ) {}

  commentForm!: FormGroup;

  communityQuery?: CommunityQueryDetail;
  queryComment: CommunityCommentDetail[] = [];

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      image: this.fb.control(null),
      comment: this.fb.control(''),
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.refreshDetail(params.get('id')!);
    });
  }

  refreshDetail(queryId: string | number): void {
    this.communityManagementService.getQuery(queryId).subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.communityQuery = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving query failed.');
      },
    });

    this.communityManagementService.getComments(queryId).subscribe({
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

  save(): void {
    if (this.commentForm.valid) {
      const comment: CommunityQuery = {
        description: this.commentForm.value.comment,
        query: this.communityQuery!.id,
        main: null,
      };
      this.communityManagementService.createComment(comment).subscribe({
        next: (res) => {
          if (res.statusCode == 201 && res.success) {
            this.toastr.success('Comment saved successfully');
            this.refreshDetail(this.communityQuery!.id);
            this.commentForm.reset();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Comment save failed.');
        },
      });
    }
  }

  getAdminComments(): CommunityCommentDetail[] | null {
    const comments = this.queryComment.filter(
      (value) => value.created_by.role === 'Admin'
    );
    return comments.length === 0 ? null : comments;
  }
}
