import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarParametroComponent } from './modificar-parametro.component';

describe('ModificarParametroComponent', () => {
  let component: ModificarParametroComponent;
  let fixture: ComponentFixture<ModificarParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
