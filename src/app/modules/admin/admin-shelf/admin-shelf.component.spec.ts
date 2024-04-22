import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShelfComponent } from './admin-shelf.component';

describe('AdminShelfComponent', () => {
  let component: AdminShelfComponent;
  let fixture: ComponentFixture<AdminShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
