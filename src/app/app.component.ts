import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloudLibrary';
      
  comprobar: string | null;
  ngOnInit() {
    
  }

  constructor(){
    this.comprobar = localStorage.getItem("idUser");
  }
}
