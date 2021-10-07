import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { observable, Observable, Observer, pipe } from 'rxjs';
import { Project } from './project';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public MyObservable: Observable<boolean>;
  private MyObservers: Observer<boolean>[] = [];

  constructor( private httpClient: HttpClient)
   {
     this.MyObservable = Observable.create((observer:Observer<boolean>)=>{
      this.MyObservers.push(observer);
     });
   }

   hideDetails: boolean = false;

   toggleDetails(){
     this.hideDetails = !this.hideDetails;
     for(let i = 0; i<this.MyObservers.length; i++){
       this.MyObservers[i].next(this.hideDetails);
     }
   }

   getAllProjects() : Observable<Project[]>
   {

     return this.httpClient.get<Project[]>("http://localhost:9090/api/projects",{responseType:"json"})
     .pipe(map(
       (data:Project[]) => {
         for(var i = 0; i<data.length; i++)
         {
           data[i].teamSize = data[i].teamSize*100;
         }
         return data;
       }
     ));
   }

   getProjectByProjectID(ProjectID: number): Observable<Project>
   {
     return this.httpClient.get<Project>("http://localhost:9090/api/projects"+ProjectID, { responseType: "json"});
   }

   insertProject(newProject:Project) : Observable<Project>
  {
    return this.httpClient.post<Project>("http://localhost:9090/api/projects",newProject,{responseType:"json"});
  }

  updateProject(existingProject:Project) : Observable<Project>
  {
    return this.httpClient.put<Project>("http://localhost:9090/api/projects"+existingProject.projectID,existingProject,{responseType:"json"});
  }
  deleteProject(projectID:number) : Observable<string>
  {
    return this.httpClient.delete<string>("http://localhost:9090/api/projects/" + projectID);
  }

  SearchProjects(searchBy:string,searchText:string) : Observable<Project[]>
   {
     return this.httpClient.get<Project[]>("http://localhost:9090/api/projects/search" + searchBy + "/" + searchText, {responseType:"json"});
   }

  }


