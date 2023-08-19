import { Component, Input } from '@angular/core';
import { Item } from 'src/app/modules/models/item.model';
import { Project } from 'src/app/modules/models/project.model';


@Component({
  selector: 'app-item-details-card',
  templateUrl: './item-details-card.component.html',
  styleUrls: ['./item-details-card.component.scss']
})
export class ItemDetailsCardComponent {
  panelOpenState = false;
  @Input() item!: Item  ;

  constructor() {
  }

}