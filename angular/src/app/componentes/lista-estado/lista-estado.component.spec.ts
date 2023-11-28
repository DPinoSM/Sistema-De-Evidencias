import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstadoComponent } from './lista-estado.component';

describe('ListaEstadoComponent', () => {
  let component: ListaEstadoComponent;
  let fixture: ComponentFixture<ListaEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEstadoComponent]
    });
    fixture = TestBed.createComponent(ListaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
