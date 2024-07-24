import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
constructor(private auth:AuthenticationService ,private router:Router){}
  
  isAuthenticated:boolean = false;

  ngOnInit(): void {
    this.auth.isAuthenticatedStatus().subscribe((isAuthenticatedStatus: boolean) => {
       this.isAuthenticated = isAuthenticatedStatus;
       console.log(this.isAuthenticated);
    });
    

  }
  
}
