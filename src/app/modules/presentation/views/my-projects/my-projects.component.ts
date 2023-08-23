import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';
import { ProjectFormComponent } from '../../feature/forms/project-form/project-form.component';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
  providers: [{
    provide: LIST_SERVICE_TOKEN,
    useExisting: ProjectService,
  }],
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
    this.projectService.getItems().subscribe((projects) => {
      this.projects = projects;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }
}
