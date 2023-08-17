import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/modules/core/services/list/list.service';
import { Type } from 'src/app/modules/models/enum';
import { Epic } from 'src/app/modules/models/epic.model';
import { Item } from 'src/app/modules/models/item.model';
import { Project } from 'src/app/modules/models/project.model';
import { Story } from 'src/app/modules/models/story';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
 
  @Input() list : any[] | undefined;

  linkSize: number = 0;
  routerLink : string = '/'
  currentLink!: string 
  loading: boolean = true;


  constructor( private route: ActivatedRoute, private listService: ListService<any>) { 
    this.currentLink = '/';
  }

  ngOnInit(): void {
    this.simulateLoading();
    this.loadList();
  }

  simulateLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  loadList() {
    this.listService.getItems().subscribe((response) => {
      this.list = response;
    });
  }

  getCurrentRoute(item: Item): string{

    this.linkSize = this.route.snapshot.url.length;
  
    for (let i = 0; i < this.linkSize; i++) {
      this.currentLink += this.route.snapshot.url[i].path + '/';
    }
    
  
    this.currentLink += `${item._id}`;
    
    this.routerLink = this.currentLink;
    this.currentLink = "/";
    return this.routerLink;

  }

}