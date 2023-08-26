import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Project } from 'src/app/modules/models/project.model';
import { EpicFormComponent } from '../../feature/forms/epic-form/epic-form.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    {
      provide: LIST_SERVICE_TOKEN,
      useExisting: EpicService,
    },
  ],
})
export class ProjectComponent implements OnInit {
  loading: boolean = true;
  project!: Project;
  epics: Epic[] = [];
  formComponent: any;
  parentItemId: string | undefined;

  constructor(
    private projectService: ProjectService,
    private epicService: EpicService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.formComponent = EpicFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('project-id');

      if (id) {
        //sirve para el delete que despues de borrar actualice lista
        this.parentItemId = id;

        //nombre inicial del breadcrumb
        this.breadcrumbService.set('@Project', 'Project ');

        //traigo los datos del proyecto para mostrar la descripción
        this.projectService.getItemById(id).subscribe({
          next: (project) => {
            this.project = project;
          },
          error: (error) => {
            this.loading = false;
            alert('Error fetching project');
          },
          complete: () => {
            this.loading = false;
          },
        });

        //traigo los epics del proyecto
        this.epicService.getItems(id).subscribe({
          next: (epics) => {
            this.epics = epics;
          },
          error: (error) => {
            this.loading = false;
            alert('Error fetching epics');
          },
          complete: () => {
            this.loading = false;
          },
        });

        //cambio el nombre del breadcrumb
        this.projectService.getItemName(id).subscribe((projectName) => {
          this.breadcrumbService.set('@Project', `${projectName}`);
        });
      }
    });
  }
}
