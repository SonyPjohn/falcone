import { TestBed } from '@angular/core/testing';

import { FalconeService } from './falcone.service';

describe('FalconeService', () => {
  let service: FalconeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalconeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
