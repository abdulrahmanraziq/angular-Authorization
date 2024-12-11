import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full',
        data: { title: 'Login' }
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        data: { title: 'Login' }
    },

    {
        path:'home',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate:[authGuard]
    },
    {
        path:'signup',
        component: SignupComponent,
        data: { title: 'Signup' }

    },
    {
        path:'forgotPassword',
        component:ForgotpasswordComponent,
        data: { title: 'Forgot Password' }

    },
    {
        path:'resetPassword',
        component:ResetpasswordComponent,
        data: { title: 'Reset Password' }

    }
];
