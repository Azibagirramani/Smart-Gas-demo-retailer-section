import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCylinderPage } from './add-cylinder.page';

describe('AddCylinderPage', () => {
  let component: AddCylinderPage;
  let fixture: ComponentFixture<AddCylinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCylinderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCylinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
