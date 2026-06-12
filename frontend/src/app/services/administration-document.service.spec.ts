import { TestBed } from '@angular/core/testing';

import { AdministrationDocumentService } from './administration-document.service';

describe('AdministrationDocumentService', () => {
  let service: AdministrationDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
