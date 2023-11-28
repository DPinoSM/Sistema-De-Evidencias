import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImpactoComponent } from './lista-impacto.component';

describe('ListaImpactoComponent', () => {
  let component: ListaImpactoComponent;
  let fixture: ComponentFixture<ListaImpactoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaImpactoComponent]
    });
    fixture = TestBed.createComponent(ListaImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
