import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectsService {


  constructor(
    private http: Http,
    private usrSerw:UserService
  ) {

  }

  getProjects(){
    return this.http.get(`${environment.apiEndpoint}/projects`,this.usrSerw.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));

  }

  getProjectById(projectId){
    return this.http.get(`${environment.apiEndpoint}/projects/${projectId}`,this.usrSerw.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  deleteProjectById(projectId){
    return this.http.delete(`${environment.apiEndpoint}/projects/${projectId}`,this.usrSerw.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  addNewProject(newProject){
    return this.http.post(`${environment.apiEndpoint}/projects`, newProject,this.usrSerw.generateHeaders(true))
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  updateProject(projectId,updateProject){
    return this.http.put(`${environment.apiEndpoint}/projects/${projectId}`, updateProject,this.usrSerw.generateHeaders(true))
    .map(res => res.json())
    .catch(res => Observable.throw(res.json()));
  }



}
