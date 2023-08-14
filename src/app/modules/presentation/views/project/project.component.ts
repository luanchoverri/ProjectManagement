import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projectId: string | null;
  // projects: Project[];
  // projects$: Subscription;
  p !: Project | undefined;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('project-id');
    console.log("este es project-id", this.projectId);
    if (this.projectId){
      this.p = this.projectService.getItemById(parseInt(this.projectId));
    }
    console.log("este es p", this.p);
    // this.projects = new Array<Project>();
    // this.projects$ = new Subscription();
  }

  // ngOnInit(): void {
  //   this.projects$ = this.projectService.getItems().subscribe(data => {
  //     if (data) {
  //       this.projects = data;
  //     }
  //     else {
  //       this.projects = new Array<Project>();
  //     }
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.projects$.unsubscribe();
  // }


}
