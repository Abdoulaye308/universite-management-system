import { TestBed } from '@angular/core/testing';

import { Reunion } from './reunion';

describe('Reunion', () => {
  let service: Reunion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reunion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
