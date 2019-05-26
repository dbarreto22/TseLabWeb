import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HechosComponent } from './hechos.component';

describe('HechosComponent', () => {
  let component: HechosComponent;
  let fixture: ComponentFixture<HechosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HechosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
