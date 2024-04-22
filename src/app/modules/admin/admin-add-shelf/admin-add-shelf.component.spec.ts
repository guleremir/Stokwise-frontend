import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddShelfComponent } from './admin-add-shelf.component';

describe('AdminAddShelfComponent', () => {
  let component: AdminAddShelfComponent;
  let fixture: ComponentFixture<AdminAddShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddShelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
