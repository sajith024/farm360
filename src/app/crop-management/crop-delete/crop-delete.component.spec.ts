import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDeleteComponent } from './crop-delete.component';

describe('CropDeleteComponent', () => {
  let component: CropDeleteComponent;
  let fixture: ComponentFixture<CropDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
