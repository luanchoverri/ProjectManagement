import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';
import { ProjectFormComponent } from '../../feature/forms/project-form/project-form.component';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectServ: any;
  projects$: Subscription;
  loading = true;
  formComponent: any;

  constructor(private projectService: ProjectService) {
    this.projects = [];
    this.projects$ = new Subscription();
    this.projectServ = projectService;
    this.formComponent = ProjectFormComponent;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
      this.loading = false;
      console.log(projects);
    });
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }
}
