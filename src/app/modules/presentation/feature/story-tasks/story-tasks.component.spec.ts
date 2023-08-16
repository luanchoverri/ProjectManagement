import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTasksComponent } from './story-tasks.component';

describe('StoryTasksComponent', () => {
  let component: StoryTasksComponent;
  let fixture: ComponentFixture<StoryTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
