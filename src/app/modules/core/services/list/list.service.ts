import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from 'src/app/modules/models/item.model'; 

@Injectable({
  providedIn: 'root'
})
export class ListService<T extends Item> {

  constructor() { }

  getItems(): Observable<T[]> {
    // Lógica para obtener elementos desde la API
    return new Observable<T[]>;
  }

  createItem(item: T): Observable<T> {
    // Lógica para crear un elemento en la API
    return new Observable<T>;
  }

  updateItem(item: T): Observable<T> {
    // Lógica para actualizar un elemento en la API
    return new Observable<T>;
  }

  deleteItem(id: string): Observable<T> {
    // Lógica para eliminar un elemento desde la API
    return new Observable<T>;
  }
}