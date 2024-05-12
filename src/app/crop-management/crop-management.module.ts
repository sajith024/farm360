import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbAccordionModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CropCreateComponent } from './crop-create/crop-create.component';
import { CropListComponent } from './crop-list/crop-list.component';
import { CropManagementRoutingModule } from './crop-management-routing.module';
import { CropManagementComponent } from './crop-management.component';
import { CropProductRecommendationComponent } from './crop-product-recommendation/crop-product-recommendation.component';
import { CropStagingContentComponent } from './crop-staging-content/crop-staging-content.component';
import { CropPestDiseasesComponent } from './crop-pest-diseases/crop-pest-diseases.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CropManagementComponent,
    CropCreateComponent,
    CropListComponent,
    CropStagingContentComponent,
    CropProductRecommendationComponent,
    CropPestDiseasesComponent,
  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    CropManagementRoutingModule,
  ],
})
export class CropManagementModule {}
