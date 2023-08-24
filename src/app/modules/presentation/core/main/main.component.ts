import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }
}
