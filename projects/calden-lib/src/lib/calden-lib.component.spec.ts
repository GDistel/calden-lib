import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaldenLibComponent } from './calden-lib.component';

describe('CaldenLibComponent', () => {
  let component: CaldenLibComponent;
  let fixture: ComponentFixture<CaldenLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaldenLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaldenLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
