import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/modules/models/item.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() list: Item[] | undefined;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.list || this.list.length === 0) {
      this.snackBar.open('There is nothing to show.', 'Dismiss', {
        duration: 5000,
      });
    }
  }

}
