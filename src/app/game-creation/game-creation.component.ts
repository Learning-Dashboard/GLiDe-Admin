import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-game-creation',
  imports: [MatStepperModule, MatCardModule, MatButtonModule, MatRadioModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInput, NgIf, NgForOf, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatEndDate, MatStartDate, MatListModule, MatIcon],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]],
  templateUrl: './game-creation.component.html',
  standalone: true,
  styleUrl: './game-creation.component.css'
})
export class GameCreationComponent {
  subjectType: string = 'existing';
  existingSubjects: any;
  games: any;
  simpleRules: any;
  dateRules: any;
  importedSimpleRules: any[] = [];
  importedDateRules: any[] = [];
  selectedSimpleRule: any;
  selectedDateRule: any;
  importChangeDate = false;
  importChangeSimple = false;

  constructor(private service: GamificationEngineService) {}

  subjectForm: FormGroup = new FormGroup({
    acronym: new FormControl,
    name: new FormControl,
    code: new FormControl,
    studies: new FormControl,
    school: new FormControl
  });
  existingSubjectForm: FormGroup = new FormGroup({
    subject: new FormControl
  });
  gameForm: FormGroup = new FormGroup({
    subject_acronym: new FormControl,
    course: new FormControl,
    period: new FormControl,
    start_date: new FormControl,
    end_date: new FormControl,
    valid: new FormControl(true)
  });
  gameLevelPolicyForm: FormGroup = new FormGroup({
    game_subject_acronym: new FormControl,
    game_course: new FormControl,
    game_period: new FormControl,
    a: new FormControl,
    b: new FormControl,
    c: new FormControl
  });
  groupForm: FormGroup = new FormGroup({
    game_subject_acronym: new FormControl,
    game_course: new FormControl,
    game_period: new FormControl,
    groups: new FormArray([new FormControl()])
  });

  onSelectionChange(event: any){
    console.log(event.previouslySelectedIndex);
    switch (event.previouslySelectedIndex) {
      case 0:
        if (this.subjectType === 'existing') this.gameForm.controls['subject_acronym']
          .setValue((this.existingSubjectForm.get('subject')?.value).acronym);
        else this.gameForm.controls['subject_acronym']
          .setValue(this.subjectForm.get('acronym')?.value);
        break;
      case 1:
        this.gameLevelPolicyForm.controls['game_subject_acronym'].setValue(this.gameForm.get('subject_acronym')?.value);
        this.gameLevelPolicyForm.controls['game_course'].setValue(this.gameForm.get('course')?.value);
        this.gameLevelPolicyForm.controls['game_period'].setValue(this.gameForm.get('period')?.value);
        this.groupForm.controls['game_subject_acronym'].setValue(this.gameForm.get('subject_acronym')?.value);
        this.groupForm.controls['game_course'].setValue(this.gameForm.get('course')?.value);
        this.groupForm.controls['game_period'].setValue(this.gameForm.get('period')?.value);
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  onGameSelect(event: MatSelectChange){
    let game = event.value;
    this.service.getSimpleRules(game.subjectAcronym, game.course, game.period).subscribe((result) => {
      this.simpleRules = result;
    });
    this.service.getDateRules(game.subjectAcronym, game.course, game.period).subscribe((result) => {
      this.dateRules = result;
    });
  }

  selectSimpleRule(rule: any){
    console.log(rule);
    if (!this.importChangeSimple) {
      this.selectedSimpleRule = rule;
    } else {
      this.importChangeSimple = false;
    }
  }

  importAllSimpleRules(){
    this.importedSimpleRules = this.importedSimpleRules.concat(this.simpleRules);
  }

  importSimpleRule(index: number){
    this.importedSimpleRules.push(this.simpleRules[index]);
    this.importChangeSimple = true;
  }

  removeImportedSimpleRule(index: number){
    this.importedSimpleRules.splice(index, 1);
    this.importChangeSimple = true;
  }

  selectDateRule(rule: any){
    if (!this.importChangeDate){
      this.selectedDateRule = rule;
    } else {
      this.importChangeDate = false;
    }
  }

  importAllDateRules(){
    this.importedDateRules = this.importedDateRules.concat(this.dateRules);
    this.noInvalidDateRange();
  }

  importDateRule(index: number){
    this.importedDateRules.push(this.dateRules[index]);
    this.importChangeDate = true;
    this.noInvalidDateRange();
  }

  removeImportedDateRule(index: number){
    this.importedDateRules.splice(index, 1);
    this.selectedDateRule = null;
    this.importChangeDate = true;
    this.noInvalidDateRange();
  }

  invalidDates(dateRule: any){
    let gameStartDate = this.gameForm.get('start_date')?.value;
    let gameEndDate = this.gameForm.get('end_date')?.value;
    if (!gameEndDate) return true;
    gameStartDate = new Date(gameStartDate);
    gameEndDate = new Date(gameEndDate);
    let startDate = new Date(dateRule.startDate);
    let endDate = new Date(dateRule.endDate);
    return (startDate < gameStartDate || startDate > gameEndDate || endDate < gameStartDate || endDate > gameEndDate);
  }

  noInvalidDateRange(){
    let invalid = false;
    for (let dateRule in this.importedDateRules){
      if (this.invalidDates(this.importedDateRules[dateRule])) {
        this.gameForm.controls['valid'].setValue(null);
        invalid = true;
        break;
      }
    }
    if (!invalid) this.gameForm.controls['valid'].setValue(true);
  }

  formatDate(dateString: string){
    let dateArray = dateString.split('/')
    return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
  }

  changeDateRuleDates(start: any, end: any){
    if (start.value && end.value){
      let startDate = this.formatDate(start.value);
      let endDate = this.formatDate(end.value);
      this.selectedDateRule.startDate = startDate;
      this.selectedDateRule.endDate = endDate;
      this.noInvalidDateRange();
    }
  }

  get groups(){
    return this.groupForm.get("groups") as FormArray;
  }

  removeGameGroup(index: number){
    this.groups.removeAt(index);
  }

  addGameGroup(){
    this.groups.push(new FormControl('', Validators.required));
  }

  ngOnInit(){
    this.service.getGames().subscribe((result) => {
      this.games = result;
    });
  }

  isFormValid(): boolean {
    return this.subjectType === 'new'
      ? this.subjectForm.valid && this.gameForm.valid && this.gameLevelPolicyForm.valid && this.groupForm.valid
      : this.existingSubjectForm.valid && this.gameForm.valid && this.gameLevelPolicyForm.valid && this.groupForm.valid;
  }

  submit(){

  }
}
