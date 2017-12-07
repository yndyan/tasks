import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserService} from './user.service';
import { environment } from '../../environments/environment';


@Injectable()
export class TasksService {

  constructor(
    private http: Http,
    private usrSerw:UserService
  ) {
  }
  getTasks(gaytewayId){
    return this.http.get(`${environment.apiEndpoint}/projects/${gaytewayId}/tasks`,this.usrSerw.generateHeaders(true)).map(res => res.json());
  }

  getTasksById(gaytewayId,taskId){
    return this.http.get(`${environment.apiEndpoint}/projects/${gaytewayId}/tasks/${taskId}`,this.usrSerw.generateHeaders(true)).map(res => res.json());
  }

  deleteTasksById(gaytewayId,taskId){
    return this.http.delete(`${environment.apiEndpoint}/projects/${gaytewayId}/tasks/${taskId}`,this.usrSerw.generateHeaders(true)).map(res => res.json());
  }
  addNewTask(gaytewayId,newTask){
      return this.http.post(`${environment.apiEndpoint}/projects/${gaytewayId}/tasks`, newTask,this.usrSerw.generateHeaders(true)).map(res => res.json());
  }


  updateTask(projectId, taskId,updateTask){
    return this.http.put(`${environment.apiEndpoint}/projects/${projectId}/tasks/${taskId}`, updateTask ,this.usrSerw.generateHeaders(true)).map(res => res.json());
  }

}
