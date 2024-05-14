import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropEditComponent } from './crop-edit.component';

describe('CropEditComponent', () => {
  let component: CropEditComponent;
  let fixture: ComponentFixture<CropEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
