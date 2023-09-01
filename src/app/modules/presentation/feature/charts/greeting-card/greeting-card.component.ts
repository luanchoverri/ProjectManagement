import { Component } from '@angular/core';
import { AuthService } from '../../../../api-rest/services/auth.service';
import { User } from 'src/app/modules/models/user';
import { UserService } from 'src/app/modules/core/services/user/user.service';

@Component({
  selector: 'app-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: ['./greeting-card.component.scss']
})
export class GreetingCardComponent {
  user!: User | null;


  
  constructor(private authService: AuthService, private us: UserService){}


  ngOnInit(){
    const userId = this.authService.getUserId();
    if (userId) {
      this.us.getUserById(userId).subscribe(
        (userOrNull) => {
          this.user = userOrNull;
        }
      );
    }
  }


}
