import { Component, Input, OnInit, Output, ViewChild, ViewChildren,QueryList } from '@angular/core';
import { ClientLocation } from 'src/app/client-location';
import { EventEmitter } from '@angular/core';

import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { ClientLocationsService } from 'src/app/client-locations.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { ProjectComponent } from '../project/project.component';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];
  showLoading: boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = 0;
  deleteProject: Project = new Project();
  deleteIndex: number = 0;
  searchBy: string = 'ProjectName';
  searchText: string = '';

  @ViewChild('newForm') newForm: NgForm | any = null;
  @ViewChild('editForm') editForm: NgForm | any = null;

  constructor(
    private projectsService: ProjectsService,
    private clientLocationsService: ClientLocationsService
  ) {}

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe((response: Project[]) => {
      this.projects = response;
    });
    this.clientLocationsService.getClientLocations().subscribe((response) => {
      this.clientLocations = response;
    });
  }

  onNewClick(event: any) {
    this.newForm.resetForm();
  }

  onSaveClick() {
    if (this.newForm.valid) {
      this.newProject.clientLocation.clientLocationID = 0;
      this.projectsService.insertProject(this.newProject).subscribe(
        (response) => {
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;

          this.projects.push(p);
          this.newProject.projectID = null;
          this.newProject.projectName = null;
          this.newProject.dateOfStart = null;
          this.newProject.teamSize = null;
          this.newProject.active = false;
          this.newProject.clientLocationID = null;
          this.newProject.status = null;

          $('#newFormCancel').trigger('click');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  onEditClick(index: number) {
    this.editForm.resetForm();
    setTimeout(() => {
      this.editProject.projectID = this.projects[index].projectID;
      this.editProject.projectName = this.projects[index].projectName;
      this.editProject.dateOfStart = this.projects[index].dateOfStart
        .split('/')
        .reverse()
        .join('~');
      this.editProject.teamSize = this.projects[index].teamSize;
      this.editProject.active = this.projects[index].active;
      this.editProject.clientLocationID = this.projects[index].clientLocationID;
      this.editProject.status = this.projects[index].status;
      this.editProject.clientLocation = this.projects[index].clientLocation;
      this.editIndex = index;
    }, 100);
  }

  onUpdateClick() {
    if (this.editForm.valid) {
      this.projectsService.updateProject(this.editProject).subscribe(
        (response: Project) => {
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

          $('#editFormCancel').trigger('click');
        },
        () => {}
      );
    }
  }
  onDeleteClick(index: number) {
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }
  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) => {
        this.projects.splice(this.deleteIndex, 1);
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
  onSearchClick() {
    this.projectsService
      .SearchProjects(this.searchBy, this.searchText)
      .subscribe(
        (response: Project[]) => {
          this.projects = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  @ViewChildren("prj") prj:QueryList<ProjectComponent>;

  onHideShowDetails(){
   this.projectsService.toggleDetails();
  }
}
