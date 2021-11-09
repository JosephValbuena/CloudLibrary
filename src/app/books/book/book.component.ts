import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/bookModel';
import { Oracle } from 'src/app/models/answerModel';
import { GeneralService } from 'src/app/services/general.service';
import { Purchase } from 'src/app/models/purchaseModel';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;
  user: string | null;
  transformed: any
  purchases: any
  cantidad: number = 0;
  date: Date = new Date();
  day = this.date.getDate()
  month = this.date.getMonth() + 1
  year = this.date.getFullYear()

  //Todos los libros
  books: Book[] = [];

  sendP:Purchase = {
    id: undefined,
    idusuario: undefined,
    idbook: undefined,
    purchasedate: undefined
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: GeneralService) {
    this.books = [];
    this.book = new Book;
    this.user = localStorage.getItem("idUser");
    if(this.user){
      this.transformed = JSON.parse(this.user);
      this.sendP.idusuario = this.transformed.id;
    }
  }

  ngOnInit(): void {
    this.books = [];
    this.service.getPurchases().subscribe((data:any) => {
      this.purchases = data.items;
      for(let i = 0; i < this.purchases.length; i++){
        if(this.purchases[i].id > this.cantidad){
          this.cantidad = this.purchases[i].id;
        }
      }
      this.cantidad = this.cantidad + 1;
    });

    this.activatedRoute.paramMap.subscribe(params =>{
      if(params.has("id")){
        this.service.getBook(params.get("id")).subscribe((book:any) =>{
          this.book = book.items[0];
          this.sendP.idbook = this.book.id;
        });

        this.service.getBooks().subscribe((books:any) =>{
          for(let i=0; i<books.items.length; i++){
            if(books.items[i].id != params.get("id") && books.items[i].category == this.book.category){
              this.books.push(books.items[i]);
            }
          }

          console.log(this.books)
        });
      }
    });

    
  }

  navigateBack(){
    this.router.navigate(["/home"]);
  }

  purchase(){
    this.sendP.id = this.cantidad;

    if(this.month < 10){
      this.sendP.purchasedate = `${this.day}-0${this.month}-${this.year}`;
    }else{
      this.sendP.purchasedate = `${this.day}-${this.month}-${this.year}`;
    }

    console.log(this.sendP)
    this.service.postPurchase(this.sendP).subscribe(data=>{
      console.log(data);
    })

    Swal.fire({
      icon: 'success',
      title: 'Bien! Has comprado este libro',
      showConfirmButton: false,
      timer: 1500
    })
  }

  verLibro(id: number | undefined){
    this.router.navigate(["/book",id]);

  }

}
