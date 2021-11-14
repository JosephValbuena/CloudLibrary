import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/bookModel';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  books: Book[] = [];
  filtro_valor= "";

  constructor(private service: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.service.getBooks().subscribe((books:any) =>{
      this.books = books.items;
      console.log(this.books);
    });
  }

  verLibro(id: number | undefined){
    this.router.navigate(["/book",id]);
  }

  handleSearch(value: string){
    this.filtro_valor = value;
    console.log(this.filtro_valor);
  }

}
