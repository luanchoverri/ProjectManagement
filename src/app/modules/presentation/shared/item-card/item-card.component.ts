import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/modules/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item !: Item;
<<<<<<< HEAD
  @Input() service : any;
=======
>>>>>>> 4f63e6d (tg-84 Fix card-list & item-card routing link)
  linkSize: number = 0;
  routerLink: string = '/';
  currentLink!: string;
 
  constructor(private route: ActivatedRoute) {
      this.currentLink = '/';
  }

  ngOnInit( ): void {
    
  }

  getCurrentRoute(item: Item): string {
    this.linkSize = this.route.snapshot.url.length;

    for (let i = 0; i < this.linkSize; i++) {
      this.currentLink += this.route.snapshot.url[i].path + '/';
    }
    this.currentLink += `${item._id}`;
    this.routerLink = this.currentLink;
    this.currentLink = '/';
    return this.routerLink;
  }

  editItem() {
<<<<<<< HEAD
    this.service.updateItem(this.item);
  }

  deleteItem() {
    this.service.deleteItem(this.item._id);
=======
    console.log("editting... "+this.item);
  }

  deleteItem() {
    console.log("deleting... "+this.item);
>>>>>>> 4f63e6d (tg-84 Fix card-list & item-card routing link)
  }

}
