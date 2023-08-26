import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsCardComponent } from './no-items-card.component';

describe('NoItemsCardComponent', () => {
  let component: NoItemsCardComponent;
  let fixture: ComponentFixture<NoItemsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoItemsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoItemsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
