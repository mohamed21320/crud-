import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const mainGuard: CanActivateFn = (route, state) => {
let router=inject(Router);
  if(localStorage.getItem('eToken')!=null){
   
    return true;
  }else{
router.navigate(['/login'])
    return false
  }
  
};
