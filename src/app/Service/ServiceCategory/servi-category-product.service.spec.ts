import { TestBed } from '@angular/core/testing';

import { ServiCategoryProductService } from './servi-category-product.service';

describe('ServiCategoryProductService', () => {
  let service: ServiCategoryProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiCategoryProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
