import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RimsComponent } from './rims.component';

describe('RimsComponent', () => {
  let component: RimsComponent;
  let fixture: ComponentFixture<RimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
