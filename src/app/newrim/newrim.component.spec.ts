import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrimComponent } from './newrim.component';

describe('NewrimComponent', () => {
  let component: NewrimComponent;
  let fixture: ComponentFixture<NewrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewrimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
