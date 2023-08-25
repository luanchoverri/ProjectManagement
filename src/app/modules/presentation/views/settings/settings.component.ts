import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { User } from 'src/app/modules/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: User | null;
  loading: boolean = true;

	constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loading = false;
  }
}
