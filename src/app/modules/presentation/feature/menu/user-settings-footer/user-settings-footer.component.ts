import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavNameService } from 'src/app/modules/core/services/navName/nav-name.service';

@Component({
  selector: 'app-user-settings-footer',
  templateUrl: './user-settings-footer.component.html',
  styleUrls: ['./user-settings-footer.component.scss'],
})

export class UserSettingsFooterComponent implements OnInit, OnDestroy {
  navName: String;
  navNameSuscription: Subscription;

  constructor(private navNameService: NavNameService) {
    this.navName = '';
    this.navNameSuscription = new Subscription();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  changeNavName(name: String) {
    this.navName = name;
    this.navNameService.changeName(name);
  }
}
