import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { Project_t } from '../project.component';
import { TasksService } from '../../../services/tasks.service';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectId:any;
  tasks: TaskList_t[];
  newTaskArrayOfKeys:any;
  taskArrayOfKeys:any;
  projArrayOfKeys:any;
  showAddTask: boolean = false;
  showUpdateProject: boolean = false;
  project: Project_t = {//TODO add this
    name:'',
    type:'',
    description:''

  }
  newTask: Task_t = {
    taskName: "",
  }
  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private projServ:ProjectsService,
    private taskServ:TasksService,
    private helpServ: HelpService,
    private flashMsg: FlashMessagesService
    
    ) {
      this.route.params.subscribe((params:Params)=>{
      this.projectId = params.projectId;
      this.newTaskArrayOfKeys = Object.keys(this.newTask);
      this.subToProjectDetails();
      this.subToTasks();
    });
  }
  
  subToProjectDetails(){
    console.log(this.projectId)
    this.projServ.getProjectById(this.projectId).subscribe(
      data =>{
        this.project = data.projectData;
        this.projArrayOfKeys = Object.keys(this.project);
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  updateProject(){
    this.projServ.updateProject(this.projectId, this.helpServ.genUrlSearchParams(this.project))
     .subscribe(
      data => {
        this.showUpdateProject = false;
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
        this.subToProjectDetails();
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      }
    );
  }

  subToTasks(){
    this.taskServ.getTasks(this.projectId).subscribe(
      data =>{
        console.log(data);
        for (let cnt; cnt < data.tasks.length; cnt++) {
          this.tasks[cnt].taskId =  data.tasks[cnt].id;
          this.tasks[cnt].taskName =  data.tasks[cnt].taskName;
          this.tasks[cnt].showTaskUpdate =  false;
        }
        this.tasks = data.tasks;
        
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  addTask(){
    this.taskServ.addNewTask(this.projectId, this.helpServ.genUrlSearchParams(this.newTask))
     .subscribe(
      data => {
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
        this.subToTasks();
        this.newTask.taskName = '';
      }
    );
  }
  deleteTask(index){
    this.taskServ.deleteTasksById(this.projectId,index).subscribe(
      data =>{
        this.subToTasks();
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  updateTask(updateTask){
    this.taskServ.updateTask(this.projectId, updateTask._id,this.helpServ.genUrlSearchParams(updateTask))
     .subscribe(
      data => {
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
        this.subToTasks();
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'],
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  ngOnInit() {
  }
}

interface TaskList_t {
  taskId:string;
  taskName:string;
  done:boolean;
  showTaskUpdate:boolean;
}

export interface Task_t {
  taskName:string;
}