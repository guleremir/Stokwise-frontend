import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditShelfComponent } from './admin-edit-shelf.component';

describe('AdminEditShelfComponent', () => {
  let component: AdminEditShelfComponent;
  let fixture: ComponentFixture<AdminEditShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditShelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
