import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarHechoCheckerComponent } from './seleccionar-hecho-checker.component';

describe('SeleccionarHechoCheckerComponent', () => {
  let component: SeleccionarHechoCheckerComponent;
  let fixture: ComponentFixture<SeleccionarHechoCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarHechoCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarHechoCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
