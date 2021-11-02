import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: string | null;
  transformed:any;
  name: string | null = "";
    
  constructor(private router: Router) {
    this.user = localStorage.getItem("idUser");
    this.transformed = "";
    if(this.user){
      this.transformed = JSON.parse(this.user);
      this.name = `${this.transformed.name} ${this.transformed.lastname}`;
    }
  }

  ngOnInit(): void {
  }

  goToProfile(){
    this.router.navigate(['/profile',this.transformed.id]);
  }

  goToBooks(){
    this.router.navigate(['/profile',this.transformed.id,"mybooks"]);
  }

}
