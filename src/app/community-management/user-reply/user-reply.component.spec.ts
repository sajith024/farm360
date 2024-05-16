import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReplyComponent } from './user-reply.component';

describe('UserReplyComponent', () => {
  let component: UserReplyComponent;
  let fixture: ComponentFixture<UserReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
