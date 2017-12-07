import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";
import { environment } from '../../environments/environment';
import { UserService } from './user.service'

@Injectable()
export class AdminService {

  constructor(private http: Http, private userSrv: UserService) { }

  addUser(newUser){
    console.log(newUser);
      return this.http.post(environment.apiEndpoint+'/admin/users', newUser,this.userSrv.generateHeaders(true)).map(res => res.json());
  }

  getUsers(){
    return this.http.get(environment.apiEndpoint+'/admin/users/',this.userSrv.generateHeaders(true)).map(res => res.json());
  }

  getUser(user_id){
    return this.http.get(environment.apiEndpoint+'/admin/users/'+user_id,this.userSrv.generateHeaders(true)).map(res => res.json());
  }

  updateUser(userId,updateUser){
    return this.http.put(`${environment.apiEndpoint}/admin/users/${userId}`, updateUser,this.userSrv.generateHeaders(true)).map(res => res.json());
  }

  updateUserPassword(userId,password){
    return this.http.put(`${environment.apiEndpoint}/admin/users/${userId}/updatepassword`,password ,this.userSrv.generateHeaders(true)).map(res => res.json());
  }

  deleteUserById(user_id){
    return this.http.delete(environment.apiEndpoint+'/admin/users/'+user_id, this.userSrv.generateHeaders(true)).map(res => res.json());
  }

}
