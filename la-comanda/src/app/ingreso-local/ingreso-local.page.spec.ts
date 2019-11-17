import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoLocalPage } from './ingreso-local.page';

describe('IngresoLocalPage', () => {
  let component: IngresoLocalPage;
  let fixture: ComponentFixture<IngresoLocalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoLocalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
