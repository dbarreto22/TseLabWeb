import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNodosPerifericosComponent } from './crear-nodos-perifericos.component';

describe('CrearNodosPerifericosComponent', () => {
  let component: CrearNodosPerifericosComponent;
  let fixture: ComponentFixture<CrearNodosPerifericosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearNodosPerifericosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNodosPerifericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
