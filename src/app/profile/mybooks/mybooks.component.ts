import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/bookModel';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {

  books: Book[] = [];
  constructor(private activatedRoute:ActivatedRoute, private service:GeneralService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('id')){
        this.service.getCustomPurchase(params.get("id")).subscribe((purchases:any) => {
          console.log(purchases.items);
          for(let i = 0; i < purchases.items.length; i++) {
            this.service.getBook(purchases.items[i].idbook).subscribe((book:any) => {
              this.books.push(book.items[0]);
            });
          }
        });
      }
    });

    console.log(this.books);
  }

  readBook(){
    alert("Leyendo Libro");
  }

}
