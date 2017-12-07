import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, LoadChildren} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/project.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';
import { HelpService } from './services/help.service';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { VerifyEmailComponent } from './components/user/verify-email/verify-email.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAddUserComponent } from './components/admin/admin-add-user/admin-add-user.component';
import { AdminUpdateUserComponent } from './components/admin/admin-update-user/admin-update-user.component';
import { AdminUserDetailsComponent } from './components/admin/admin-user-details/admin-user-details.component';

import { FlashMessagesModule } from 'ngx-flash-messages';



const appRoutes: Routes =  [
  
  {path:'projects', canActivate:[AuthGuard], children: [
      { path:'', component: ProjectsComponent},
      { path: ':projectId', component: ProjectDetailsComponent },
  ]},
  {path:'user', component: UserComponent,canActivate:[AuthGuard] },
  {path:'user/register', component: RegisterComponent},
  {path:'user/login', component: LoginComponent},
  {path:'user/update_user', component: UpdateUserComponent,canActivate:[AuthGuard]},
  {path:'user/verifyemail/:verifyCode', component: VerifyEmailComponent},
  {path:'admin', component: AdminComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'admin', canActivate:[AuthGuard,RoleGuard], children: [
      { path: 'add-user', component:  AdminAddUserComponent },
      { path: ':userId', component: AdminUserDetailsComponent },
      { path: ':userId/update', component: AdminUpdateUserComponent },
  ]},
  {path: '**', redirectTo: '/projects'},
]

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UpdateUserComponent,
    VerifyEmailComponent,
    AdminAddUserComponent,
    AdminComponent,
    AdminUpdateUserComponent,
    AdminUserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule
  ],
  providers: [ProjectsService,TasksService,UserService,AuthGuard,AdminService,HelpService,RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

















// const appRoutes: Routes =  [
//   {path:'', component: HomeComponent},
//   {path:'projects', component: ProjectsComponent, canActivate:[AuthGuard]},
//   {path:'projects/addproject', component: AddProjectComponent},
//   {path:'projects/:projectId', component: ProjectDetailsComponent},
//
//   {path:'projects/:projectId/tasks', component: TasksComponent,canActivateChild:[AuthGuard]},
//   {path:'projects/:projectId/tasks/addtask', component: AddTaskComponent},
//   {path:'projects/:projectId/tasks/:taskId', component: TasksDetailsComponent},
//
//   {path:'users/register', component: RegisterComponent},
//   {path:'users/login', component: LoginComponent},
//
// ]
