import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  constructor( private http: Http ) { }

  addUser(newUser){
    return this.http.post(environment.apiEndpoint+'/user', newUser,this.generateHeaders(false))
    .map(res=> res.json())
    .catch(res => Observable.throw(res.json()));
  }

  authUser(userData){
    return this.http.post(environment.apiEndpoint+'/user/auth',userData,this.generateHeaders(false))
    .map(res=>res.json())
    .catch(res => Observable.throw(res.json()));
    
  }

  getUser(){
    return this.http.get(environment.apiEndpoint+'/user/profile',this.generateHeaders(true))
    .map(res => res.json())
    .catch(res => Observable.throw(res.json()));
  }

  storeUserData(token, role){
    localStorage.setItem('id_token', token);
    localStorage.setItem('userRole', role);
  }


  generateHeaders(withAuth){
      const headers = new Headers();
      if (withAuth) {
        headers.append('Authorization', localStorage.getItem('id_token'));
      }
      headers.append('Content-Type','application/x-www-form-urlencoded');
      return { headers: headers };
  }

  checkTokenNotExpired(){
    return tokenNotExpired('id_token');
  }

  checkUserIsAdmin(){
    // console.log("role",localStorage.getItem('userRole'));
    return (localStorage.getItem('userRole') === 'admin');
  }
  

  logout(){
    localStorage.clear();
  }

  updateUser(updateUser){
    return this.http.put(`${environment.apiEndpoint}/user/update`, updateUser,this.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  updateUserPassword(password){
    return this.http.put(`${environment.apiEndpoint}/user/password`,password,this.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  verifyEmail(verifyCode){
    return this.http.post(`${environment.apiEndpoint}/user/verifyemail`, verifyCode, this.generateHeaders(false))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }


}
