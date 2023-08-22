import { Component, Input } from '@angular/core';
import { Epic } from 'src/app/modules/models/epic.model';
import { ProjectService } from '../../../../core/services/project/project.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss']
})
export class EpicDetailsComponent {

  panelOpenState = false;
  @Input() item !: Epic ;

  constructor(
    private projecT: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.item) {
      console.log(this.item.project.name);

      
    }
  }

}
