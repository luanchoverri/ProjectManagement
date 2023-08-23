import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { Project } from 'src/app/modules/models/project.model';
import { ProjectFormComponent } from '../../feature/forms/project-form/project-form.component';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';

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
  //A la card que muestra la lista de proyectos le paso la lista de proyectos esta estatica, 
  //OJO CAPZ ES AHI la cosa, estoy listando un arreglo, no un observable
  projects: Project[] = [];

  projects$: Subscription = new Subscription();
  loading = true;
  formComponent: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    //me suscribo a la lista observable del servicio, 
    //los metodos http solo emiten el primer valor, no estan sujetos a cambios 
    this.projects$ = this.projectService.getItems().subscribe((projects) => {
      //recibo la lista y la paso a la variable local
      this.projects = projects;
      this.loading = false;
    });
    this.formComponent = ProjectFormComponent;
  }

  ngOnDestroy(): void {
    this.projects$.unsubscribe();
  }

}
