import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, catchError } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Project } from 'src/app/modules/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
 
  id!: string;
  loading: boolean = true;
  project!: Project ;
  epics: Epic[] = [];

  //no se usan
  epics$: Subscription = new Subscription();
 // project$: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('project-id');

      if (id) {
        const info$ = this.getSpecificationsById(id);
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

  getSpecificationsById(id: string) {
    return this.projectService.getProjectById(id);
  }

  getEpics(id: string) {
    return this.projectService.getEpicsByProject(id);
  }

  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }


}
