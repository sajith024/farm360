import { TestBed } from '@angular/core/testing';

import { CropManagementServiceService } from './crop-management-service.service';

describe('CropManagementServiceService', () => {
  let service: CropManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
