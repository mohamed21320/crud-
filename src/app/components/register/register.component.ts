import { SignService } from './../../shared/sign.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  msgErr:string='';
  constructor(private _FormBuilder:FormBuilder,private _SignService:SignService,private _Router:Router){}
 registerForm:FormGroup= this._FormBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
  rePassword:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  
 })

 hanleForm(){
if(this.registerForm.valid){
  this._SignService.setRegister(this.registerForm.value).subscribe({
    next:(res)=>{
  console.log(res);
  if(res.message=='success'){
this._Router.navigate(['/login'])
  }
    },
    error:(err:HttpErrorResponse)=>{
  this.msgErr =err.error.message;
  
    }
  })
}else{
  this.registerForm.markAllAsTouched();
}



 }

}


