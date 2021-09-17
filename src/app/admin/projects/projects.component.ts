import { Component, Input, OnInit, Output } from '@angular/core';

import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit
{
projects:Project[]=[] ;
newProject:Project = new Project();
editProject: Project = new Project();
editIndex: number = 0;
deleteProject: Project = new Project();
deleteIndex: number = 0;

  constructor(private projectsService: ProjectsService)
  {

  }

  ngOnInit()
  {
    this.projectsService.getAllProjects().subscribe(
      (response:Project[])=> {
        this.projects = response;
      }
    );
  }

  onSaveClick()
  {
    this.projectsService.insertProject(this.newProject).subscribe((Response)=>{
      this.projects.push(this.newProject);
      this.newProject.projectID = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
    },(error)=> {
console.log(error);
    })
  }
onEditClick(event:any,index:number)
{
this.editProject.projectID = this.projects[index].projectID;
this.editProject.projectName = this.projects[index].projectName;
this.editProject.dateOfStart = this.projects[index].dateOfStart;
this.editProject.teamSize = this.projects[index].teamSize;
this.editIndex = index;
}

onUpdateClick()
{
this.projectsService.updateProject(this.editProject).subscribe((response:Project)=>
{
  var p: Project = new Project();
  p.projectID = response.projectID;
  p.projectName = response.projectName;
  p.dateOfStart = response.dateOfStart;
  p.teamSize = response.teamSize;
  this.projects[this.editIndex] = p;

  this.editProject.projectID = null;
  this.editProject.projectName = null;
  this.editProject.dateOfStart = null;
  this.editProject.teamSize = null;
},
()=>{})
}
onDeleteClick(event:any,index:number)
{
  this.deleteIndex = index;
  this.deleteProject.projectID = this.projects[index].projectID;
  this.deleteProject.projectName = this.projects[index].projectName;
  this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
  this.deleteProject.teamSize = this.projects[index].teamSize;

}
onDeleteConfirmClick()
{
  this.projectsService.deleteProject(this.deleteProject.projectID).subscribe(
    (response) => {
      this.projects.splice(this.deleteIndex,1);
      this.deleteProject.projectID = null;
  this.deleteProject.projectName = null;
  this.deleteProject.dateOfStart = null;
  this.deleteProject.teamSize = null;

    },
  (error) => {
    console.log(error);
  }
  );




}
}

