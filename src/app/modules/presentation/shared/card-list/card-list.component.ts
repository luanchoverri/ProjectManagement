import { Component, Input } from '@angular/core';
import { Item } from 'src/app/modules/models/item.model';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input() list: Item[] | undefined;

  constructor() {}

}
