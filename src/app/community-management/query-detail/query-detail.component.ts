import { Component, OnInit } from '@angular/core';
import { CommunityQueryDetail } from '../../model/community-management/community-query';
@Component({
  selector: 'farm360-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrl: './query-detail.component.scss',
})
export class QueryDetailComponent implements OnInit {
  constructor() {}

  communityQuery!: CommunityQueryDetail;

  ngOnInit(): void {}
}
