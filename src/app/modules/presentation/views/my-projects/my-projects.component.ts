import { Component, OnInit } from '@angular/core';
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
export class MyProjectsComponent implements OnInit {

  projects: Project[] = [];
  loading = true;
  formComponent: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllItems().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        alert('Error fetching projects');
      },
      complete: () => {
        this.loading = false;
      },
    });
    this.formComponent = ProjectFormComponent;
  }

}
