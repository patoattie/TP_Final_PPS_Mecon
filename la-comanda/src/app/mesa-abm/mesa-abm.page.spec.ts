import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaAbmPage } from './mesa-abm.page';

describe('MesaAbmPage', () => {
  let component: MesaAbmPage;
  let fixture: ComponentFixture<MesaAbmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaAbmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaAbmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
