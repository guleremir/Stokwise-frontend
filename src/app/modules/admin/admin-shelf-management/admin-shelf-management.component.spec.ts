import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShelfManagementComponent } from './admin-shelf-management.component';

describe('AdminShelfManagementComponent', () => {
  let component: AdminShelfManagementComponent;
  let fixture: ComponentFixture<AdminShelfManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShelfManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShelfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
