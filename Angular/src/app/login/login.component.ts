import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

import {MyServiceService} from '../my-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message : string
  constructor(private myService : MyServiceService, public router: Router) {
    this.loginForm = new FormGroup({
      email : new FormControl(null, Validators.email),
      pwd : new FormControl(null)
    })
   }

  ngOnInit(): void {
  }
  login(body : any){
    localStorage.setItem('Login-Email',body.email)
    this.myService.login(body).subscribe(res=>{
      console.log("Login successfully")
      window.localStorage.setItem('token', JSON.stringify(res));
      this.router.navigate(['/dash']);
      this.message ="successfully login"
    })
  }
  movetoregister(){
    this.router.navigate(['/register']);
  }
}
