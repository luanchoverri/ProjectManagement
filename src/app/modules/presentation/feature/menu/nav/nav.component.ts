import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavNameService } from 'src/app/modules/core/services/navName/nav-name.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{

  navName:String;
  navNameSuscription: Subscription;

  constructor( private navNameService : NavNameService) { 
    this.navName = '';
    this.navNameSuscription = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  changeNavName(name: String){
    this.navName = name;
    this.navNameService.changeName(name);
  }

}

