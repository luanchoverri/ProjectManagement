import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/presentation/views/home/home.component';
import { MyProjectsComponent } from './modules/presentation/views/my-projects/my-projects.component';
import { MyStoriesComponent } from './modules/presentation/views/my-stories/my-stories.component';
import { SettingsComponent } from './modules/presentation/views/settings/settings.component';
import { ProjectComponent } from './modules/presentation/views/project/project.component';
import { EpicComponent } from './modules/presentation/views/epic/epic.component';
import { StoryComponent } from './modules/presentation/views/story/story.component';
import { LoginComponent } from './modules/presentation/views/login/login.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
 { path: 'my-projects/:project-id/:epic-id/:story-id', component: StoryComponent, pathMatch: 'full'},
  {path: 'my-projects/:project-id/:epic-id', component: EpicComponent, pathMatch: 'full'},
  {path: 'my-projects/:project-id', component: ProjectComponent, pathMatch: 'full' },
  {path: 'my-projects', component: MyProjectsComponent, 
    // children: [
  //     { path: 'my-projects/:project-id/:epic-id/:story-id/:task-id', component: TasksComponent, pathMatch: 'full'},  --> esta no existe solo navega hasta Story 
  //     { path: 'my-projects/:project-id/:epic-id/:story-id', component: StoryComponent, pathMatch: 'full'},
  //     { path: 'my-projects/:project-id/:epic-id', component: EpicComponent, pathMatch: 'full'},
  //     { path: ':project-id', component: ProjectComponent},
  // ]
  },
  {path: 'my-stories', component:MyStoriesComponent},
  {path: 'settings', component:SettingsComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
