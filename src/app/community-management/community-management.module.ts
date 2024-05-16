import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminReplyComponent } from './admin-reply/admin-reply.component';
import { CommunityManagementRoutingModule } from './community-management-routing.module';
import { CommunityManagementComponent } from './community-management.component';
import { QueryDetailComponent } from './query-detail/query-detail.component';
import { UserReplyComponent } from './user-reply/user-reply.component';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [
    CommunityManagementComponent,
    QueryDetailComponent,
    AdminReplyComponent,
    UserReplyComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbCarouselModule,
    CommunityManagementRoutingModule,
  ],
})
export class CommunityManagementModule {}
