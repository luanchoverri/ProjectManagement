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
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  navId: string | null | undefined;
  projectId !: string;
  // projects: Project[];
  // projects$: Subscription;
  loading = true;
  clickedProject !: Project;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
  }

  epics: Epic[] = [];
  epics$: Subscription = new Subscription;
  project$: Subscription = new Subscription;

  ngOnInit(): void {

    //  this.navId = this.route.snapshot.paramMap.get('project-id');
    //  console.log("este es project-id", this.navId);
    // if (this.navId){
    //   this.projectId = this.navId;

    // }

    this.route.paramMap.subscribe(params => {
      const projectId = params.get('project-id'); // Obtén el ID del parámetro de la URL

      if (projectId) {
        const getSpecifications$ = this.getProjectSpecificationsById(projectId);
        const getEpics$ = this.getEpics(projectId);

        forkJoin([getSpecifications$, getEpics$]).subscribe(
          ([specifications, epics]) => {
            this.clickedProject = specifications;
            this.epics = epics;
            this.loading = false;
          }
        );
      }
    });
  }
  


  getProjectSpecificationsById(id: string) {
    return this.projectService.getProjectById(id);
  }

  getEpics(id: string) {
    return this.projectService.getEpicsByProject(id);
  }



  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }


  // getProjectSpecificationsById(id :string ){
  //   this.projectService.getProjectById(id).subscribe(
  //     project => {
  //       console.log(project);
  //       this.clickedProject = project;
  //       this.loading = false;
  //     }  
  //   );
  // }

  // getEpics(id : string){
  //   this.projectService.getEpicsByProject(id).subscribe(
  //     epics => {
  //       console.log(epics);
  //       this.epics = epics;
  //     }  
  //   );
}


