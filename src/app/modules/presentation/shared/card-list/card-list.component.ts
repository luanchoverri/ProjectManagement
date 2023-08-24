import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.list || this.list.length === 0) {
      this.snackBar.open('There is nothing to show.', 'Dismiss', {
        duration: 2000,
      });
    }
  }

}
