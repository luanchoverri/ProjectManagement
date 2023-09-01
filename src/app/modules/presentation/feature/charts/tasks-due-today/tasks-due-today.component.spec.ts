import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDueTodayComponent } from './tasks-due-today.component';

describe('TasksDueTodayComponent', () => {
  let component: TasksDueTodayComponent;
  let fixture: ComponentFixture<TasksDueTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDueTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDueTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
