import { CanActivateFn, Router } from '@angular/router';
import {LoginService} from './login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router)

  if(loginService.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false
  }
};
