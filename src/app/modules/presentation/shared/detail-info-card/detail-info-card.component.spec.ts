import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoCardComponent } from './detail-info-card.component';

describe('DetailInfoCardComponent', () => {
  let component: DetailInfoCardComponent;
  let fixture: ComponentFixture<DetailInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
