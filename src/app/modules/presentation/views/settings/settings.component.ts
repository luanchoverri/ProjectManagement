import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { UserService } from 'src/app/modules/core/services/user/user.service';
import { User } from 'src/app/modules/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: User | null;
  loading: boolean = true;
  darkMode: boolean = false;

  constructor(private authService: AuthService, private us: UserService) { }

  ngOnInit(): void {

    const userId = this.authService.getUserId();
    if (userId) {
      this.us.getUserById(userId).subscribe(
        (userOrNull) => {
          this.user = userOrNull
          this.loading = false;
        }
      );
    }


  }

  logOut(): void {
    this.authService.logout();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

}
