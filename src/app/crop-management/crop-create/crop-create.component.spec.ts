import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropCreateComponent } from './crop-create.component';

describe('CropCreateComponent', () => {
  let component: CropCreateComponent;
  let fixture: ComponentFixture<CropCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
