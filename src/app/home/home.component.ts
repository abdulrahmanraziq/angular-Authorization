import { Component } from '@angular/core';
import {LoginService} from '../login.service';
import {GetAllUsers} from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    constructor(private loginService: LoginService){}
    allUsers!:Array<any>

    ngOnInit(){
      this.loginService.getData().subscribe({
        next:(data:GetAllUsers) =>{
          this.allUsers = data.allUsers
          console.log(this.allUsers);
        }, 
        error:(err) => {
          console.log(err);
        }
      })
    }
}
