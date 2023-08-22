import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, catchError } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Project } from 'src/app/modules/models/project.model';
import { EpicFormComponent } from '../../feature/forms/epic-form/epic-form.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserService } from 'src/app/modules/core/services/user/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {

  id!: string;
  loading: boolean = true;
  project!: Project;
  epics: Epic[] = [];
  epicsServ: any;
  formComponent: any;

  //no se usan
  epics$: Subscription = new Subscription();
  projectSpecifications: any;

  // project$: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private epicService: EpicService,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.epicsServ = epicService;
    this.formComponent = EpicFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('project-id');

      if (id) {

        this.breadcrumbService.set('@Project', `Project`);
        const info$ = this.projectService.getProjectById(id);
        const epics$ = this.getEpics(id);

        forkJoin([info$, epics$]).subscribe(
          ([info, epics]) => {
            this.project = info;
            this.epics = epics;
            this.loading = false;
          }
        );
      }
    });

  }

  getEpics(id: string) {
    return this.projectService.getEpicsByProject(id);
  }

  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }



}
