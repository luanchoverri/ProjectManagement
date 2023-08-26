import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/modules/models/item.model';
import { puffAnimation } from 'src/assets/styles/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations:[puffAnimation],
})
export class CardListComponent implements OnInit {
  @Input() list: Item[] | undefined;
  @Input() parentId: string | undefined;

  constructor() {}

  ngOnInit(): void {}

}
