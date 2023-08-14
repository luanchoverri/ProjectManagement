import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/presentation/views/home/home.component';
import { MyProjectsComponent } from './modules/presentation/views/my-projects/my-projects.component';
import { MyStoriesComponent } from './modules/presentation/views/my-stories/my-stories.component';
import { SettingsComponent } from './modules/presentation/views/settings/settings.component';
import { ProjectComponent } from './modules/presentation/views/project/project.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'my-projects/:project-id', component: ProjectComponent, pathMatch: 'full' },
  {path: 'my-projects', component: MyProjectsComponent, 
  //   children: [
  //     { path: 'my-projects/:project-id/:epic-id/:task-id/:story-id', component: TasksComponent, pathMatch: 'full'},
  //     { path: 'my-projects/:project-id/:epic-id/:task-id', component: StoriesComponent, pathMatch: 'full'},
  //     { path: 'my-projects/:project-id/:epic-id', component: EpicsComponent, pathMatch: 'full'},
  //     { path: 'my-projects/:project-id', component: ProjectComponent, pathMatch: 'full' },
  // ]
  },
  {path: 'my-stories', component:MyStoriesComponent},
  {path: 'settings', component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
