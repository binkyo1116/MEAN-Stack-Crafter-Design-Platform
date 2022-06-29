import { TestBed } from '@angular/core/testing';

import { ProfileUploadService } from './profile-upload.service';

describe('ProfileUploadService', () => {
  let service: ProfileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
