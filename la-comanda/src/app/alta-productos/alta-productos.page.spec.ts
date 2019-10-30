import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductosPage } from './alta-productos.page';

describe('AltaProductosPage', () => {
  let component: AltaProductosPage;
  let fixture: ComponentFixture<AltaProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProductosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
