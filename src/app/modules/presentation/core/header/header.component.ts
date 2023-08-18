import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavNameService } from 'src/app/modules/core/services/navName/nav-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  openMenu: boolean =false;
  navName:String;
  navNameSuscription: Subscription;
  // breadcrumbString!: string;
  

  constructor( private navNameService : NavNameService) { 
    this.openMenu = false;
    this.navName = 'Home';
    this.navNameSuscription = new Subscription();
  }

  ngOnInit(){
    this.navNameSuscription = this.navNameService.name$.subscribe( name => {
      this.navName = name;
      console.log('name', name);

      // const breadcrumbNames = this.navNameService.getBreadcrumbNames();
      // this.breadcrumbString = breadcrumbNames.join(' > ');
    });
  }


  toggleMenu(){
    this.openMenu = !this.openMenu;

  }

  ngOnDestroy(){
    this.navNameSuscription.unsubscribe();
  }


 
}
