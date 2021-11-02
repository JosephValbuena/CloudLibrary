import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CommentsComponent } from './social/comments/comments.component';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './temp/sidebar/sidebar.component';
import { FooterComponent } from './temp/footer/footer.component';
import { NavbarComponent } from './temp/navbar/navbar.component';
import { AuthServiceService } from './services/auth-service.service';
import { appRouting } from './app.routes';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { GeneralService } from './services/general.service';
import { BookComponent } from './books/book/book.component';
import { MybooksComponent } from './profile/mybooks/mybooks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CommentsComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    BookComponent,
    MybooksComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService, GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
