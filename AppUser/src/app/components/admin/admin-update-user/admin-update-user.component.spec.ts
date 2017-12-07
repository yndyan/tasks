import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateUserComponent } from './admin-update-user.component';

describe('AdminUpdateUserComponent', () => {
  let component: AdminUpdateUserComponent;
  let fixture: ComponentFixture<AdminUpdateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
