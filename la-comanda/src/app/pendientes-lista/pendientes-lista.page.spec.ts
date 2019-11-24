import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesListaPage } from './pendientes-lista.page';

describe('PendientesListaPage', () => {
  let component: PendientesListaPage;
  let fixture: ComponentFixture<PendientesListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendientesListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendientesListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
