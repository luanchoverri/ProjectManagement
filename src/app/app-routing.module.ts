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
import { PageNotFoundComponent } from './modules/presentation/views/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'my-projects',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My Projects' },
    children: [
      {
        path: '',
        component: MyProjectsComponent,
        pathMatch: 'full'
      },
      {
        path: ':project-id', 
        canActivate: [AuthGuard],
        data: { breadcrumb: { alias: 'Project' } }, 
        children: [
          {
            path: '',
            component: ProjectComponent,
            pathMatch: 'full',
            },
             {
               path: ':epic-id', 
               canActivate: [AuthGuard],
              data: { breadcrumb: { alias: 'Epic' } },
              children: [
                {
                path: '',
                component: EpicComponent,
                canActivate: [AuthGuard],
                pathMatch: 'full',
                },
                 {
                   path: ':story-id',
                    component: StoryComponent,
                    canActivate: [AuthGuard],
                   pathMatch: 'full',
                  data: { breadcrumb: { alias: 'Story' } },
                 }]
             }]
      }
    ]
  },
  {
    path: 'my-stories',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'My Stories'},
    children: [
      {
        path: '',
        component: MyStoriesComponent,
        pathMatch: 'full'
      },
      {
        path: ':story-id', 
        canActivate: [AuthGuard],
        component: StoryComponent,
        pathMatch: 'full',
        data: { breadcrumb: { alias: 'Story' } }
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Settings' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' }
  },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BreadcrumbModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }