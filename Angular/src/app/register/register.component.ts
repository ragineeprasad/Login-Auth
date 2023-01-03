import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MyServiceService } from '../my-service.service'
import { Router, ActivatedRoute } from '@angular/router';
import { isError } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage: string;
  pwdMatchMsg : boolean = false;
  constructor(private myService: MyServiceService,private router: Router, private _activateRoute : ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    })
  }

  ngOnInit(): void {
  }

  passValidator(control: AbstractControl) {
    if (control != undefined && control != null) {
      var cnfpwd = control.value;

      var pwdControl = control.root.get('password');
      if(pwdControl != null){
        var pwdControlVal = pwdControl.value;
      }
      // if(cnfpwd == pwdControlVal){
      //   this.pwdMatchMsg = true;
      // }

      if (cnfpwd != pwdControlVal || cnfpwd == "" || cnfpwd == null) {
        return {
          isError: true
        }
      }

    }
  }
  register() {
    this.myService.submitRegister(this.myForm.value).subscribe(
      data => this.successMessage = 'Registration Success',
      error => this.successMessage = 'SOme error'

    )
  }

  moveToLogin(){
    //this.router.navigateByUrl('/login');
    this.router.navigate(['../login'], { relativeTo: this._activateRoute });
  }

}
