import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutStoriesComponent } from './doughnut-stories.component';

describe('DoughnutStoriesComponent', () => {
  let component: DoughnutStoriesComponent;
  let fixture: ComponentFixture<DoughnutStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughnutStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
