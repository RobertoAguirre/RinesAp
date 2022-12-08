import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenprintComponent } from './greenprint.component';

describe('GreenprintComponent', () => {
  let component: GreenprintComponent;
  let fixture: ComponentFixture<GreenprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
