import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPestDiseasesComponent } from './crop-pest-diseases.component';

describe('CropPestDiseasesComponent', () => {
  let component: CropPestDiseasesComponent;
  let fixture: ComponentFixture<CropPestDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropPestDiseasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropPestDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
