import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ProjectIDUniqueValidatorDirective, multi:true}]
})
export class ProjectIDUniqueValidatorDirective {

  constructor(private projectsService: ProjectsService) { }

  validate(control: AbstractControl): any {
    this.projectsService.getProjectByProjectID(control.value).pipe(map((existingProject:Project)=>{
      if(existingProject != null)
      {
        return{ uniqueProjectID: {valid:false}};
      }
      else
      {
        return null;
      }
    }));
  }

}
