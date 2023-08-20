import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/modules/models/item.model';
import { Project } from 'src/app/modules/models/project.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item !: Item;
  @Input() service : any;
  linkSize: number = 0;
  routerLink: string = '/';
  currentLink!: string;
 
  constructor(private route: ActivatedRoute) {
      this.currentLink = '/';
  }

  ngOnInit( ): void {
    
  }

  getCurrentRoute(): string {
    return this.item._id;
  }

  editItem() {
    this.service.updateItem(this.item);
  }



  deleteItem() {
    this.service.deleteItem(this.item._id);
  }






}
