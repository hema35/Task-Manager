import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject")
  project: Project = new Project;
  @Input("recordIndex") i: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
