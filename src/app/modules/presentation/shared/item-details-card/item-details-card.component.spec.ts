import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsCardComponent } from './item-details-card.component';

describe('ItemDetailsCardComponent', () => {
  let component: ItemDetailsCardComponent;
  let fixture: ComponentFixture<ItemDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
