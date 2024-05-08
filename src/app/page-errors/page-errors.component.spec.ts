import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorsComponent } from './page-errors.component';

describe('PageErrorsComponent', () => {
  let component: PageErrorsComponent;
  let fixture: ComponentFixture<PageErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
