import { Injectable } from '@angular/core';
import User from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  mockUserLogin(data: { user: User, token: string}) : void{
    const { user, token } = data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  getUser() : User{
    const userData = localStorage.getItem('user');
    if(userData){
      try{
        return JSON.parse(userData) as User;
      }catch(error){
        console.log('Invalid user data in LocalStorage', error);
      }
    }
    return new User();
  }

  getToken() : string{
    return localStorage.getItem('token') || '';
  }
}
