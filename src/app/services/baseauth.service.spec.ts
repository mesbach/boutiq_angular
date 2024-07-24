import { TestBed, inject } from '@angular/core/testing';

import { BaseauthService } from './baseauth.service';

describe('BaseauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseauthService]
    });
  });

  it('should be created', inject([BaseauthService], (service: BaseauthService) => {
    expect(service).toBeTruthy();
  }));
});
