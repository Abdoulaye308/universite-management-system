import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insertions } from './insertions';

describe('Insertions', () => {
  let component: Insertions;
  let fixture: ComponentFixture<Insertions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insertions],
    }).compileComponents();

    fixture = TestBed.createComponent(Insertions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
