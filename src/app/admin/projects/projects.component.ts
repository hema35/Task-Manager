import { Component, OnInit } from '@angular/core';

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

}
