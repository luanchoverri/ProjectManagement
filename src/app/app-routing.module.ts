import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/presentation/views/home/home.component';
import { MyProjectsComponent } from './modules/presentation/views/my-projects/my-projects.component';
import { MyStoriesComponent } from './modules/presentation/views/my-stories/my-stories.component';
import { SettingsComponent } from './modules/presentation/views/settings/settings.component';
import { MyEpicsComponent } from './modules/presentation/views/my-epics/my-epics.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'my-projects', component:MyProjectsComponent, children: [
    { path: ':projectId', component: MyEpicsComponent }
  ]},
  {path: 'my-stories', component:MyStoriesComponent},
  {path: 'settings', component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
