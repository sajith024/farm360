import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropProductRecommendationComponent } from './crop-product-recommendation.component';

describe('CropProductRecommendationComponent', () => {
  let component: CropProductRecommendationComponent;
  let fixture: ComponentFixture<CropProductRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropProductRecommendationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropProductRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
