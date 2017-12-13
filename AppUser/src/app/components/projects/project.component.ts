import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { HelpService } from '../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectsComponent implements OnInit {

  projects:any;
  project: Project_t = {//TODO add this
    name:'',
    type:'',
    description:''
  }
  arrayOfKeys:any;
  showAddProject : boolean = false;
  constructor(
    private projServ:ProjectsService,
    private router: Router,
    private helpServ: HelpService,
    private flashMsg: FlashMessagesService
    
    ) {
    this.subToPr();
    this.arrayOfKeys = Object.keys(this.project);
  }

  subToPr(){
    this.projServ.getProjects().subscribe(
      data =>{
        this.projects = data.projects;
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }

  ngOnInit() {
  }
  deleteProject(projectId){
    this.projServ.deleteProjectById(projectId).subscribe(
      data =>{
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
        this.subToPr();//this refresh page on delete
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  onAddProjectSubmit(){
    this.projServ.addNewProject(this.helpServ.genUrlSearchParams(this.project))
     .subscribe(
       data => {
        this.subToPr();
        this.project = {
          name:'',
          type:'',
          description:''
        } 
        this.showAddProject = false;
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  
}

export interface Project_t {
  name:string;
  type:string;
  description:string;

}
