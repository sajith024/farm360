import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropStagingContentComponent } from './crop-staging-content.component';

describe('CropStagingContentComponent', () => {
  let component: CropStagingContentComponent;
  let fixture: ComponentFixture<CropStagingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropStagingContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropStagingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
