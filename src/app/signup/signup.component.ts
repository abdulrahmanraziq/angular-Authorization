import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;
  isLoading: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {
    const formBuilder = inject(FormBuilder);
    this.signUpForm = this.createSignupForm(formBuilder);
  }

  private createSignupForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Example for mobile validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Added minimum length for password
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.loginService.signup(this.signUpForm.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data) {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
        },
      });
    }
  }
}
