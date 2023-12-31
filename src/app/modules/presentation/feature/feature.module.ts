import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './menu/nav/nav.component';
import { LogoHeaderComponent } from './menu/logo-header/logo-header.component';
import { UserSettingsFooterComponent } from './menu/user-settings-footer/user-settings-footer.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { EpicFormComponent } from './forms/epic-form/epic-form.component';
import { StoryFormComponent } from './forms/story-form/story-form.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './charts/card/card.component';
import { CalendarComponent } from './charts/calendar/calendar.component';
import { DoughnutStoriesComponent } from './charts/doughnut-stories/doughnut-stories.component';
import { AnimatedCounterComponent } from './charts/animated-counter/animated-counter.component';
import { GreetingCardComponent } from './charts/greeting-card/greeting-card.component';
import { TasksDueTodayComponent } from './charts/tasks-due-today/tasks-due-today.component';


@NgModule({
  declarations: [
    MenuComponent,
    LogoHeaderComponent,
    NavComponent,
    UserSettingsFooterComponent,
    ProjectFormComponent,
    EpicFormComponent,
    StoryFormComponent,
    TaskFormComponent,
    CardComponent,
    CalendarComponent,
    DoughnutStoriesComponent,
    AnimatedCounterComponent,
    GreetingCardComponent,
    TasksDueTodayComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    ProjectFormComponent,
    EpicFormComponent,
    StoryFormComponent,
    TaskFormComponent,
    CardComponent,
    CalendarComponent,
    DoughnutStoriesComponent,
    AnimatedCounterComponent,
    GreetingCardComponent,
    TasksDueTodayComponent,
  ]
})
export class FeatureModule { }
