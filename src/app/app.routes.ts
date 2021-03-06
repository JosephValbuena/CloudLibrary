import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CommentsComponent } from './social/comments/comments.component';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookComponent } from './books/book/book.component';
import { MybooksComponent } from './profile/mybooks/mybooks.component';
import {AuthGuard} from './guard/auth.guard';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: 'profile/:id',
        canActivate:[AuthGuard],
        component: ProfileComponent 
    },
    { 
        path: 'profile/:id/mybooks',
        canActivate:[AuthGuard],
        component: MybooksComponent 
    },
    { 
        path: 'book/:id', 
        canActivate:[AuthGuard],
        component: BookComponent 
    },
    { 
        path: 'comments', 
        component: CommentsComponent 
    },
    { 
        path: '**', 
        pathMatch:'full', 
        redirectTo: 'home' 
    }
];

export const appRouting = RouterModule.forRoot(routes);