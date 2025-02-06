import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BoardAdminComponent } from './features/board-admin/board-admin.component';
import { BoardModeratorComponent } from './features/board-moderator/board-moderator.component';
import { BoardUserComponent } from './features/board-user/board-user.component';

import { httpInterceptorProviders } from './core/interceptors/http.interceptor';
import { NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
  
   
  ],
  imports: [
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule,
    AppComponent,
  ],
  providers: [httpInterceptorProviders],
})
export class AppModule { }