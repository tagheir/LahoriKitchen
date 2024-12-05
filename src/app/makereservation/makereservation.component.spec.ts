/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakereservationComponent } from './makereservation.component';

describe('MakereservationComponent', () => {
  let component: MakereservationComponent;
  let fixture: ComponentFixture<MakereservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakereservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakereservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
