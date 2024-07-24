import { TestBed, inject } from '@angular/core/testing';

import { RecentProductService } from './recent-product.service';

describe('RecentProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentProductService]
    });
  });

  it('should be created', inject([RecentProductService], (service: RecentProductService) => {
    expect(service).toBeTruthy();
  }));
});
