import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];

  projects$: Subscription;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    this.projects$ = new Subscription();
  }

  ngOnInit(): void {
    
        this.loadProjects();

  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      console.log(projects);
    });
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }
}
