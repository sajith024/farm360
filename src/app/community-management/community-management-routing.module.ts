import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryDetailComponent } from './query-detail/query-detail.component';
import { UserReplyComponent } from './user-reply/user-reply.component';
import { CommunityManagementComponent } from './community-management.component';

const routes: Routes = [
  { path: '', component: CommunityManagementComponent },
  { path: 'detail', component: QueryDetailComponent },
  { path: 'replies', component: UserReplyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityManagementRoutingModule {}
