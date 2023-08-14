import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-item-details-card',
  templateUrl: './item-details-card.component.html',
  styleUrls: ['./item-details-card.component.scss']
})
export class ItemDetailsCardComponent {
  panelOpenState = false;
  @Input() item!: any;

  constructor() {
  }

}
