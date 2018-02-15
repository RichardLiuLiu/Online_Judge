import { TestBed, inject } from '@angular/core/testing';

import { SearchInputService } from './search-input.service';

describe('SearchInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchInputService]
    });
  });

  it('should be created', inject([SearchInputService], (service: SearchInputService) => {
    expect(service).toBeTruthy();
  }));
});
