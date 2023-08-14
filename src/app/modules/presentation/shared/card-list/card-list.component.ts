import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/modules/core/services/list/list.service';
import { Type } from 'src/app/modules/models/enum';
import { Epic } from 'src/app/modules/models/epic.model';
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
  loading: boolean = false;


  constructor( private route: ActivatedRoute, private listService: ListService<any>) { 
   // this.item = new Item( "TITULO" , "DESCRIPCION" );
    //si estoy en una vista anidada, el tamaño del arreglo de la ruta es mayor a 1, 
    //concateno todo y agrego el id del item al final
   
    this.currentLink = '/';


  

  }

  ngOnInit(): void {
    // this.listService.getItems().subscribe((response) => {
    //     this.list = response;
    //     this.loading = false;
    // });  
  }

  getCurrentRoute(item: Project | Story | Epic): string{

    this.linkSize = this.route.snapshot.url.length;
  
    for (let i = 0; i < this.linkSize; i++) {
      this.currentLink += this.route.snapshot.url[i].path + '/';
    }

   
    this.currentLink += `${item.id}`;
    
    this.routerLink = this.currentLink;
    this.currentLink = "/";
    return this.routerLink;

  }

}