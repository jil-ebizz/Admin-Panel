import { TestBed } from '@angular/core/testing';

import { UsereditGuard } from './useredit.guard';

describe('UsereditGuard', () => {
  let guard: UsereditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsereditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
