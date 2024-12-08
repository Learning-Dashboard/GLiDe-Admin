import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {formatDate, NgForOf, NgIf} from '@angular/common';
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
  selectedGame: any;
  simpleRules: any;
  dateRules: any;
  importedSimpleRules: any[] = [];
  importedDateRules: any[] = [];
  selectedSimpleRule: any;
  selectedDateRule: any;
  selectedDateRuleIndex: any;
  selectedDateRuleIsImported: any;
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
    end_date: new FormControl
  });
  gameLevelPolicyForm: FormGroup = new FormGroup({
    game_subject_acronym: new FormControl,
    game_course: new FormControl,
    game_period: new FormControl
  });
  groupForm: FormGroup = new FormGroup({
    game_subject_acronym: new FormControl,
    game_course: new FormControl,
    game_period: new FormControl
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

  selectDateRule(rule: any, index: any, isImported: any){
    console.log("HOLA1");
    if (!this.importChangeDate){
      this.selectedDateRule = rule;
      this.selectedDateRuleIndex = index;
      this.selectedDateRuleIsImported = isImported;
    } else {
      this.importChangeDate = false;
    }
  }

  importAllDateRules(){
    this.importedDateRules = this.importedDateRules.concat(this.dateRules);
  }

  importDateRule(index: number){
    console.log("HOLA2")
    this.importedDateRules.push(this.dateRules[index]);
    this.importChangeDate = true;
  }

  removeImportedDateRule(index: number){
    this.importedDateRules.splice(index, 1);
    this.selectedDateRule = null;
    this.importChangeDate = true;
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
    for (let dateRule in this.importedDateRules){
      if (this.invalidDates(this.importedDateRules[dateRule])) return false;
    }
    return true
  }

  formatDate(dateString: string){
    let dateArray = dateString.split('/')
    return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
  }

  changeDateRuleDates(start: any, end: any){
    console.log(start.value)
    console.log(end.value)
    console.log(this.selectedDateRule.startDate)
    if (start.value && end.value){
      let startDate = this.formatDate(start.value);
      let endDate = this.formatDate(end.value);
      if (this.selectedDateRuleIsImported){
        this.importedDateRules[this.selectedDateRuleIndex].startDate = startDate;
        this.importedDateRules[this.selectedDateRuleIndex].endDate = endDate;
      } else {
        this.dateRules[this.selectedDateRuleIndex].startDate = startDate;
        this.dateRules[this.selectedDateRuleIndex].endDate = endDate;
      }
    }
  }

  ngOnInit(){
    this.service.getGames().subscribe((result) => {
      this.games = result;
    });
  }
}