import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDonacionesComponent } from './ver-donaciones.component';

describe('VerDonacionesComponent', () => {
  let component: VerDonacionesComponent;
  let fixture: ComponentFixture<VerDonacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDonacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
