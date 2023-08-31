import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingCardComponent } from './greeting-card.component';

describe('GreetingCardComponent', () => {
  let component: GreetingCardComponent;
  let fixture: ComponentFixture<GreetingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreetingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
