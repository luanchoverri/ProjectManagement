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
  projectId !: number;
  // projects: Project[];
  // projects$: Subscription;
  p !: Project | undefined;

  constructor(private projectService: ProjectService, private route: ActivatedRoute,  private epicService: EpicService) {
   
    // this.projects = new Array<Project>();
    // this.projects$ = new Subscription();
  }

  epics: Epic[] = [];
  epics$: Subscription = new Subscription;

  ngOnInit(): void {


     this.navId = this.route.snapshot.paramMap.get('project-id');
    console.log("este es project-id", this.navId);
    if (this.navId){
      this.projectId = parseInt(this.navId);
      this.p = this.projectService.getItemById(this.projectId);
      this.epics = this.epicService.getEpicsByProjectId(this.projectId);
    }


        
      console.log("data epicas", this.epics);


  }

  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }

}
