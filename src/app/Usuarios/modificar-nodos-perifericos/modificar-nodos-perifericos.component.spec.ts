import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNodosPerifericosComponent } from './modificar-nodos-perifericos.component';

describe('ModificarNodosPerifericosComponent', () => {
  let component: ModificarNodosPerifericosComponent;
  let fixture: ComponentFixture<ModificarNodosPerifericosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarNodosPerifericosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarNodosPerifericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
