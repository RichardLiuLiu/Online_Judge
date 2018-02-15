import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNumberComponent } from './user-number.component';

describe('UserNumberComponent', () => {
  let component: UserNumberComponent;
  let fixture: ComponentFixture<UserNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
