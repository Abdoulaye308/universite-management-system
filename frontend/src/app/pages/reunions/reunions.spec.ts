import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reunions } from './reunions';

describe('Reunions', () => {
  let component: Reunions;
  let fixture: ComponentFixture<Reunions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reunions],
    }).compileComponents();

    fixture = TestBed.createComponent(Reunions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
