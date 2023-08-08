import { TestBed } from '@angular/core/testing';

import { NavNameService } from './nav-name.service';

describe('NavNameService', () => {
  let service: NavNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
