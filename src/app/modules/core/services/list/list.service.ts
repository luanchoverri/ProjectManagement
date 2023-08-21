import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ListService<Item> {

  abstract getItems(): Observable<Item[]>;

  abstract createItem(item: Item): Observable<Item>;

  abstract updateItem(item: Item): Observable<Item>;

  abstract deleteItem(id: string): Observable<Item | null>;

  //Llamar a esta funcion desde el item-detail-card y filtar que datos del total muestra la vista
  //abstract getViewDetails(id: string): Observable<Item>;
}