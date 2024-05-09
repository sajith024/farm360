import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LOCAL_STORAGE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
