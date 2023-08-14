import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEpicsComponent } from './my-epics.component';

describe('MyEpicsComponent', () => {
  let component: MyEpicsComponent;
  let fixture: ComponentFixture<MyEpicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEpicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
