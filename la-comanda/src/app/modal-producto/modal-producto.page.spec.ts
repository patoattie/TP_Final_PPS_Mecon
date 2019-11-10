import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductoPage } from './modal-producto.page';

describe('ModalProductoPage', () => {
  let component: ModalProductoPage;
  let fixture: ComponentFixture<ModalProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
