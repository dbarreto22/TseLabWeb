import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComponenetesComponent } from './gestion-componenetes.component';

describe('GestionComponenetesComponent', () => {
  let component: GestionComponenetesComponent;
  let fixture: ComponentFixture<GestionComponenetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionComponenetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComponenetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
