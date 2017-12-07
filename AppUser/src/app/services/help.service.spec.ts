import { TestBed, inject } from '@angular/core/testing';

import { HelpService } from './help.service';

describe('HelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpService]
    });
  });

  it('should be created', inject([HelpService], (service: HelpService) => {
    expect(service).toBeTruthy();
  }));
});
