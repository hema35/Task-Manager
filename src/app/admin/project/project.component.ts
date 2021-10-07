import { Component, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/project';
import { EventEmitter } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject")
  project: Project = new Project;
  @Input("recordIndex") i: number = 0;

 @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  hideDetails: boolean = false;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.MyObservable.subscribe((hide: any)=>{
      this.hideDetails = hide;
    });
  }

  onEditClick(event: any,i: number){
    this.editClick.emit({event,i});
  }

  onDeleteClick(event: any,i: number){
     this.deleteClick.emit({event,i});
  }

  toggleDetails(){
    this.hideDetails = !this.hideDetails;
  }

}
