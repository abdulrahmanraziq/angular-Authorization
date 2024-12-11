import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {loginUpData, loginUpPayload, GetAllUsers} from './interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8000"


  signup(payload:any){
    return this.http.post(`${this.url}/user/signup`, payload).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.getErrorMessage(error)))
      })
    )
  }

  login(payload:loginUpPayload): Observable<loginUpData>{
    return this.http.post<loginUpData>(`${this.url}/user/login`, payload).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.getErrorMessage(error)))
      })
    )
  }

  getData():Observable<GetAllUsers>{
    return this.http.get<GetAllUsers>(`${this.url}/user/getAllUsers`).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.getErrorMessage(error)))
      })
    )
  }

  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    return token;
  }


  getErrorMessage(error:any):string{
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.status === 0) {
      return 'Network error: Please check your internet connection.';
    }
    return `Unexpected error: ${error.status} ${error.statusText}`;
  }
}
