import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarHechoComponent } from './verificar-hecho.component';

describe('VerificarHechoComponent', () => {
  let component: VerificarHechoComponent;
  let fixture: ComponentFixture<VerificarHechoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarHechoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarHechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
