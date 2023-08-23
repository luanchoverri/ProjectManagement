import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';
import { ProjectFormComponent } from '../../feature/forms/project-form/project-form.component';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';
import { puffAnimation } from 'src/assets/styles/animations';

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

  projects: Project[] = [];
  projects$: Subscription = new Subscription();
  loading = true;
  formComponent: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects$ = this.projectService.getItems().subscribe((projects) => {
      this.projects = projects.sort((a, b) => b._id.localeCompare(a._id)); // sort descendente
      this.loading = false;
    });
    this.formComponent = ProjectFormComponent;
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }

}
