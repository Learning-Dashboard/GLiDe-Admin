import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {LeaderboardEditionComponent} from '../leaderboard-edition/leaderboard-edition.component';
import {RuleEditionComponent} from '../rule-edition/rule-edition.component';

@Component({
  selector: 'app-game-edition',
  imports: [MatCardModule, MatStepperModule, MatFormField, MatLabel, MatOption, MatSelect, NgForOf, ReactiveFormsModule, MatDateRangeInput, MatDateRangePicker, MatDatepickerToggle, MatEndDate, MatHint, MatStartDate, MatSuffix, MatButton, MatListModule, NgIf, MatIcon, MatMiniFabButton, LeaderboardEditionComponent, RuleEditionComponent],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]],
  templateUrl: './game-edition.component.html',
  styleUrl: './game-edition.component.css'
})
export class GameEditionComponent {
  games: any;
  simpleRules: any;
  dateRules: any;
  selectedSimpleRule: any;
  selectedDateRule: any;
  leaderboards: any;
  achievements: any;
  selectedFile: any;
  evaluableActions: any;

  constructor(private service: GamificationEngineService) {}

  gameForm: FormGroup = new FormGroup({
    game: new FormControl,
    start_date: new FormControl,
    end_date: new FormControl,
  });

  simpleRuleForm: FormGroup = new FormGroup({
    rule: new FormControl,
  });

  dateRuleForm: FormGroup = new FormGroup({
    rule: new FormControl,
  });

  ngOnInit(){
    this.service.getGames().subscribe((result) => {
      this.games = result;
    });
  }

  onGameSelect(){
    let game = this.gameForm.get('game')?.value;
    this.service.getSimpleRules(game.subjectAcronym, game.course, game.period).subscribe((result) => {
      this.simpleRules = result;
    });
    this.service.getDateRules(game.subjectAcronym, game.course, game.period).subscribe((result) => {
      this.dateRules = result;
    });
    this.service.getLeaderboards(game.subjectAcronym, game.course, game.period).subscribe((result) => {
      this.leaderboards = result;
    });
    this.service.getAchievements().subscribe((result) => {
      this.achievements = result;
    });
    this.service.getEvaluableActions().subscribe((result) => {
      this.evaluableActions = result;
    })
  }

  selectSimpleRule(){

  }

  selectDateRule(){

  }

  deleteSimpleRule(){

  }

  deleteDateRule(){

  }

  editSimpleRule(){

  }

  editDateRule(){

  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0){
      this.selectedFile = input.files![0];
    }
  }

  deleteFile(inputElement: HTMLInputElement){
    this.selectedFile = null;
    inputElement.value='';
  }

  submitCSV(){

  }
}
