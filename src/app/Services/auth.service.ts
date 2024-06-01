import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged: Boolean = false;
  userService: UserService = inject(UserService);

  router:Router = inject(Router);

  login(username:string, password: string) {
    let user = this.userService.users.find(u =>
      u.username === username && u.password === password
    )
    if(user === undefined) this.isLogged = false;
    else this.isLogged = true;
    return user
  }

  logout() {
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.isLogged;
  }
}
