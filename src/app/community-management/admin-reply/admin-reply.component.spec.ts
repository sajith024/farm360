import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyComponent } from './admin-reply.component';

describe('AdminReplyComponent', () => {
  let component: AdminReplyComponent;
  let fixture: ComponentFixture<AdminReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
