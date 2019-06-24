import { TestBed } from '@angular/core/testing';

import { CylinderService } from './cylinder.service';

describe('CylinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CylinderService = TestBed.get(CylinderService);
    expect(service).toBeTruthy();
  });
});
