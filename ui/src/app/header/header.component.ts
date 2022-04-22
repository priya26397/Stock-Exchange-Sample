import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(val => this.isAuthenticated = val);
  }

  constructor(private authService: AuthenticationService) {

  }

 

}
