import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.formComponent = EpicFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('project-id');

      if (id) {
        this.breadcrumbService.set('@Project', `Project`);
        const info$ = this.projectService.getProjectById(id);
        const epics$ = this.getEpics(id);

        forkJoin([info$, epics$]).subscribe(([info, epics]) => {
          this.project = info;
          this.epics = epics;
          this.loading = false;
        });
      }
    });
  }

  getEpics(id: string) {
    return this.projectService.getEpicsByProject(id);
  }
}
