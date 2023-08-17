import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  clickedProject !: Project ;

  constructor(private projectService: ProjectService, private route: ActivatedRoute,  private epicService: EpicService) {
   
    // this.projects = new Array<Project>();
    // this.projects$ = new Subscription();
  }

  epics: Epic[] = [];
  epics$: Subscription = new Subscription;

  ngOnInit(): void {

    //  this.navId = this.route.snapshot.paramMap.get('project-id');
    //  console.log("este es project-id", this.navId);
    // if (this.navId){
    //   this.projectId = this.navId;
    
    // }

    this.route.paramMap.subscribe(params => {
    const projectId = params.get('project-id'); // Obtén el ID del parámetro de la URL
      if (projectId) {
        this.projectService.getProjectById(projectId).subscribe(
          project => {
            console.log(project);
            this.clickedProject = project;
            this.loading = false;
          }  
        );
      }
    });
  }

  

  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }

}
