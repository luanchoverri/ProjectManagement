import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/presentation/views/home/home.component';
import { MyProjectsComponent } from './modules/presentation/views/my-projects/my-projects.component';
import { MyStoriesComponent } from './modules/presentation/views/my-stories/my-stories.component';
import { SettingsComponent } from './modules/presentation/views/settings/settings.component';
import { ProjectComponent } from './modules/presentation/views/project/project.component';
import { EpicComponent } from './modules/presentation/views/epic/epic.component';
import { StoryComponent } from './modules/presentation/views/story/story.component';
import { BreadcrumbModule } from "xng-breadcrumb";
import { LoginComponent } from './modules/presentation/views/login/login.component';
import { AuthGuard } from './modules/presentation/guards/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,

    data: { breadcrumb: 'Login' }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'my-projects',
    data: { breadcrumb: 'My Projects' },
    children: [
      {
        path: '',
        component: MyProjectsComponent,
        pathMatch: 'full'
      },
      {
        path: ':project-id',  // padre sin match full
        data: { breadcrumb: { alias: 'Project' } },
        children: [
          {
            path: '',
            component: ProjectComponent,
            pathMatch: 'full',
          },
          {
            path: ':epic-id', // padre sin match full
            data: { breadcrumb: { alias: 'Epic' } },
            children: [
              {
                path: '',
                component: EpicComponent,
                pathMatch: 'full',
              },
              {
                path: ':story-id', // padre sin match full -> si se agregan tasks hay q sacarle el component y el match
                component: StoryComponent,
                pathMatch: 'full',
                data: { breadcrumb: { alias: 'Story' } },
              }]
          }]
      }
    ]
  },
  {
    path: 'my-stories',
    component: MyStoriesComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My Stories' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Settings' }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BreadcrumbModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }