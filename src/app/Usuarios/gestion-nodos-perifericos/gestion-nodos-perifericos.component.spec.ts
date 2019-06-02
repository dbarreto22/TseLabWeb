import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNodosPerifericosComponent } from './gestion-nodos-perifericos.component';

describe('GestionNodosPerifericosComponent', () => {
  let component: GestionNodosPerifericosComponent;
  let fixture: ComponentFixture<GestionNodosPerifericosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNodosPerifericosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNodosPerifericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
