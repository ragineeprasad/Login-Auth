import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  readonly url = "http://localhost:3001/"
  constructor(private http : HttpClient) { }

  submitRegister(body: any){
     return this.http.post(this.url +'register',body)

  }
  login(body:any){
    return this.http.post(this.url+'login', body)
  }

   httpOptions = {
    headers: new HttpHeaders({
      "Authorization":"Bearer" + localStorage.getItem("token")
    })
  };
  getUserName(){
    return this.http.get(this.url+'username',this.httpOptions)
}
getUserNameByEmail(email : any){
  let body ={
    "email" :email
  }
  return this.http.post(this.url + 'userNameByEmail',body)
}
}
