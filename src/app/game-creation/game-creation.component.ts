import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {resolve} from '@angular/compiler-cli';


@Component({
  selector: 'app-game-creation',
  imports: [MatStepperModule, MatCardModule, MatButtonModule, MatRadioModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInput, NgIf, NgForOf, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatEndDate, MatStartDate, MatListModule],
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
  importedDateRules: any;
  selectedSimpleRule: any;
  selectedDateRule: any;

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
    this.selectedSimpleRule = rule;
  }

  importAllSimpleRules(){
    this.importedSimpleRules = this.importedSimpleRules.concat(this.simpleRules);
    this.simpleRules = [];
  }

  ngOnInit(){
    this.service.getGames().subscribe((result) => {
      this.games = result;
    });
  }
}
