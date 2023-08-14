import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent{
 
  @Input() list : any[] | undefined;
  parentRoute : string = '';
  
  constructor( private route: ActivatedRoute) { 
    this.parentRoute = this.route.snapshot.url[0].path;
    console.log(this.parentRoute);
  }

}
