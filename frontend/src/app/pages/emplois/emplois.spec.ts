import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emplois } from './emplois';

describe('Emplois', () => {
  let component: Emplois;
  let fixture: ComponentFixture<Emplois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emplois],
    }).compileComponents();

    fixture = TestBed.createComponent(Emplois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
