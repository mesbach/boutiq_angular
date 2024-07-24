import { TestBed, inject } from '@angular/core/testing';

import { FileInputService } from './file-input.service';

describe('FileInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileInputService]
    });
  });

  it('should be created', inject([FileInputService], (service: FileInputService) => {
    expect(service).toBeTruthy();
  }));
});
