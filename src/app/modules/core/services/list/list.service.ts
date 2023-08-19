import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from 'src/app/modules/models/item.model'; 

@Injectable({
  providedIn: 'root'
})
export abstract class ListService<T extends Item> {

  abstract getItems(): Observable<T[]>;

  abstract createItem(item: T): Observable<T>;

  abstract updateItem(item: T): Observable<T>;

  abstract deleteItem(id: string): Observable<T>;

  //Llamar a esta funcion desde el item-detail-card y filtar que datos del total muestra la vista
  //abstract getViewDetails(id: string): Observable<T>;

  //  abstract getItemById(id: number): Item;
}