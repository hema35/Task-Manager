import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl,  FormGroup } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CommonModule  } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
   signUpForm: FormGroup;
   genders = ["male","female"];
   countries: Country[]=[];
  constructor(private countriesService: CountriesService) {
    this.signUpForm = new FormGroup({
      personName: new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
    }),
      email: new FormControl(null),
      mobile: new FormControl(null),
      dateOfBirth: new FormControl(null),
      countryID: new FormControl(null),
      gender: new FormControl(null),
      receiveNewsLetters: new FormControl(null),
      skills: new FormArray([]),
    });
   }

  ngOnInit() {
    this.countries = this.countriesService.getCountries();
this.signUpForm.valueChanges.subscribe((value)=>{
  console.log(value);
})
  }
  onSubmitClick(){
    console.log(this.signUpForm.value);
  }

  onAddSkill(){
    var formGroup = new FormGroup({
      skillName: new FormControl(null),
      level: new FormControl(null)
    });
    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(){

    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }

}
