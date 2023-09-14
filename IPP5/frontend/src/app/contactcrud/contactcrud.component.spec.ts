import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactcrudComponent } from './contactcrud.component';

describe('ContactcrudComponent', () => {
  let component: ContactcrudComponent;
  let fixture: ComponentFixture<ContactcrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactcrudComponent]
    });
    fixture = TestBed.createComponent(ContactcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
