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


// const routes: Routes = [
//   {path: 'home', component:HomeComponent, data: { breadcrumb: 'Home' }},
//  { path: 'my-projects/:project-id/:epic-id/:story-id', component: StoryComponent, pathMatch: 'full', data: { breadcrumb: {alias: 'Story'} }},
//   {path: 'my-projects/:project-id/:epic-id', component: EpicComponent, pathMatch: 'full', data: { breadcrumb: {alias: 'Epic'} }},
//   {path: 'my-projects/:project-id', component: ProjectComponent, pathMatch: 'full', data: { breadcrumb: {alias: 'Project'} }},
//   {path: 'my-projects', component: MyProjectsComponent, data: { breadcrumb: 'My Projects' },
//     // children: [
//   //     { path: 'my-projects/:project-id/:epic-id/:story-id/:task-id', component: TasksComponent, pathMatch: 'full'},  --> esta no existe solo navega hasta Story 
//   //     { path: 'my-projects/:project-id/:epic-id/:story-id', component: StoryComponent, pathMatch: 'full'},
//   //     { path: 'my-projects/:project-id/:epic-id', component: EpicComponent, pathMatch: 'full'},
//   //     { path: ':project-id', component: ProjectComponent},
//   // ]
//   },
//   {path: 'my-stories', component:MyStoriesComponent, data: { breadcrumb: 'My Stories' }},
//   {path: 'settings', component:SettingsComponent, data: { breadcrumb: 'Settings' }}
// ];

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
    data: { breadcrumb: 'My Stories' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { breadcrumb: 'Settings' }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BreadcrumbModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
        // children: [
        //   {
        //     path: ':epic-id',
        //     component: EpicComponent,
        //     pathMatch: 'full',
        //     data: { breadcrumb: { alias: 'Epic' } },
        //     children:[
        //       {
        //         path: ':story-id',
        //         component: StoryComponent,
        //         pathMatch:'full',
        //         data:{breadcrumb:{alias:'Story'}}
        //       }
        //     ]
        //   }
        // ]
