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
  currentLink: string = '/';


  constructor( private route: ActivatedRoute) { 
    // this.item = new Item( "TITULO" , "DESCRIPCION" );
    // //si estoy en una vista anidada, el tamaño del arreglo de la ruta es mayor a 1, 
    // //concateno todo y agrego el id del item al final
    // this.linkSize = this.route.snapshot.url.length;
    // console.log(this.linkSize);
    // for (let i = 0; i < this.linkSize; i++) {
    //   this.currentLink += this.route.snapshot.url[i].path + '/';
    // }
    // this.currentLink += this.item.id;
  }

  ngOnInit(): void {
    
  }

}
