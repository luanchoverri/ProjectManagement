import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavNameService {

  name$ = new EventEmitter<String>();

  constructor() { }
}
