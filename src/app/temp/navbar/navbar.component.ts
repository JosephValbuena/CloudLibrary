import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @Output('search') searchEmitter = new EventEmitter<string>();
  search = new FormControl('');
  auth: boolean = false;
  token: string | null = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.token = localStorage.getItem("token");

    if(this.token){
      this.auth = true;
    }

    this.search.valueChanges
    .pipe(
      debounceTime(200)
    )
    .subscribe(value => {
      this.searchEmitter.emit(value);
    });

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
