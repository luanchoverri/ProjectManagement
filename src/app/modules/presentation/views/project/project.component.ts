import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { ListService } from 'src/app/modules/core/services/list/list.service';
import { Epic } from 'src/app/modules/models/epic.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  epics: Epic[];
  epics$: Subscription;

  constructor(private es: ListService<Epic>) {
    this.epics = new Array<Epic>();
    this.epics$ = new Subscription();
  }

  ngOnInit(): void {
    this.epics$ = this.es.getItems().subscribe(data => {
      if (data) {
        this.epics = data;
        console.log(this.epics);
      }
      else {
        this.epics = new Array<Epic>();
        console.log(this.epics);
      }
    });
  }


}
