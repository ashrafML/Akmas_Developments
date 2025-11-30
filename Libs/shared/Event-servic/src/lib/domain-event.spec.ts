import { TestBed } from '@angular/core/testing';

import { DomainEvent } from './domain-event';

describe('DomainEvent', () => {
  let service: DomainEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
