import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  openMenu: boolean = false;

  constructor() {
    this.openMenu = false;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }
}
