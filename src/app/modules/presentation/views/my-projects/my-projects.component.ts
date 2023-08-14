import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit, OnDestroy{

  projects: Project[];
  projects$: Subscription;

  constructor(private projectService: ProjectService) {
    this.projects = new Array<Project>();
    this.projects$ = new Subscription();
  }

  ngOnInit(): void {
    this.projects$ = this.projectService.getItems().subscribe(data => {
      if (data) {
        this.projects = data;
      }
      else {
        this.projects = new Array<Project>();
      }
    });
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }

}
