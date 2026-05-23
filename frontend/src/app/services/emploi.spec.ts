import { TestBed } from '@angular/core/testing';

import { Emploi } from './emploi';

describe('Emploi', () => {
  let service: Emploi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emploi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
