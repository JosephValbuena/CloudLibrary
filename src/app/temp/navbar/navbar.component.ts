import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  auth: boolean = false;
  token: string | null = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.token = localStorage.getItem("token");

    if(this.token){
      this.auth = true;
    }

  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  logout(){
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    location.reload();
  }

}
