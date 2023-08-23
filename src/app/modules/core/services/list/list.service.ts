import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/modules/models/item.model';

export const LIST_SERVICE_TOKEN = new InjectionToken<ListService<Item>>(
  'LIST SERVICE TOKEN'
);

export abstract class ListService<Item> {
  
  abstract getItems(): Observable<Item[]>;

  abstract createItem(item: Item): Observable<Item>;

  abstract updateItem(item: Item): Observable<Item | null>;

  abstract deleteItem(id: string): Observable<Item | null>;

  abstract editItem(item: Item): void;

  //Llamar a esta funcion desde el item-detail-card y filtar que datos del total muestra la vista
  //abstract getViewDetails(id: string): Observable<Item>;
}
