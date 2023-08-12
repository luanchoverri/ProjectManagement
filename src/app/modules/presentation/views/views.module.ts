import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    MyProjectsComponent,
    MyStoriesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    MaterialModule,
    SharedModule
  ]
})
export class ViewsModule { }
