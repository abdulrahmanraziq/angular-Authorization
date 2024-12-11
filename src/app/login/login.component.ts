import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../login.service';
import {loginUpData} from '../interface';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  isLoading:boolean = false;
  constructor(private loginService: LoginService, private router: Router){
    const formBuilder = inject(FormBuilder);
    this.loginForm = this.createLoginForm(formBuilder);
  }
  
  private createLoginForm(formBuilder:FormBuilder):FormGroup {
    return formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.loginService.login(this.loginForm.value).subscribe({
        next: (data: loginUpData) => {
          let { message, token, role, name, email } = data;
          this.isLoading = false;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("email", email);
          this.router.navigate(['/home']);
        },

        error:(error) => {
          this.isLoading = false;
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
        }
      })
    }
    
  }

}
