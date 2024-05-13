import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignService } from 'src/app/shared/sign.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder,private _SignService:SignService,private _Router:Router){}
  logInForm:FormGroup= this._FormBuilder.group({
   email:[null,[Validators.required,Validators.email]],
   password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
  })
 msgErr:string='';
handleForm(){
  if(this.logInForm.valid){
this._SignService.setLogin(this.logInForm.value).subscribe({
  next:(res)=>{
console.log(res);
if(res.message=='success'){
localStorage.setItem('eToken',res.token)
this._Router.navigate(['/home'])
}
  },
  error:(err:HttpErrorResponse)=>{
    this.msgErr=err.error.message
  }
})
  }
}
  
}
