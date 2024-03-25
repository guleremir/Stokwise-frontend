import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryProductComponent } from './entry-product.component';

describe('EntryProductComponent', () => {
  let component: EntryProductComponent;
  let fixture: ComponentFixture<EntryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
