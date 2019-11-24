import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasListaPage } from './mesas-lista.page';

describe('MesasListaPage', () => {
  let component: MesasListaPage;
  let fixture: ComponentFixture<MesasListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesasListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
