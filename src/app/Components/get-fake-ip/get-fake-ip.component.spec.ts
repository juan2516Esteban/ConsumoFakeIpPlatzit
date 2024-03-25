import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFakeIpComponent } from './get-fake-ip.component';

describe('GetFakeIpComponent', () => {
  let component: GetFakeIpComponent;
  let fixture: ComponentFixture<GetFakeIpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetFakeIpComponent]
    });
    fixture = TestBed.createComponent(GetFakeIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
