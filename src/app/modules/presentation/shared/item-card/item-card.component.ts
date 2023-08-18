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
    console.log("editting... "+this.item);
  }

  deleteItem() {
    console.log("deleting... "+this.item);
  }

}
