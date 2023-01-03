import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
username :String;
result : any;
  constructor(private myService:MyServiceService,
    private _router: Router) {
    // this.myService.getUserName()
    // .subscribe(
    //   data => this.username= data.toString(),
    //   error => this._router.navigate(['/login'])
    // )
   }

  ngOnInit(): void {
    console.log(localStorage.getItem('Login-Email'))
    this.myService.getUserNameByEmail(localStorage.getItem('Login-Email')).subscribe(res=>{
      console.log(res)
      this.result =res;
     this.username = this.result.username
    })
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
