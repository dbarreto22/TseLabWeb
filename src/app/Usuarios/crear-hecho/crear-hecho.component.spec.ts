import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHechoComponent } from './crear-hecho.component';

describe('CrearHechoComponent', () => {
  let component: CrearHechoComponent;
  let fixture: ComponentFixture<CrearHechoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHechoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
