import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { SettingsComponent } from './settings/settings.component';
import { MyEpicsComponent } from './my-epics/my-epics.component';
import { ProjectComponent } from './project/project.component';
import { EpicComponent } from './epic/epic.component';
import { StoryComponent } from './story/story.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HomeComponent,
    MyProjectsComponent,
    MyStoriesComponent,
    SettingsComponent,
    MyEpicsComponent,
    ProjectComponent,
    EpicComponent,
    StoryComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    SharedModule,
    MaterialModule,
    SharedModule
  ]
})
export class ViewsModule { }
