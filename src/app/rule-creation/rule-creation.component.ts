import { Component } from '@angular/core';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {NgForOf, NgIf} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-rule-creation',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatRadioModule, NgForOf, NgIf, MatDatepickerModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './rule-creation.component.html',
  standalone: true,
  styleUrl: './rule-creation.component.css'
})
export class RuleCreationComponent {
  protected evaluableActions: any;
  protected games: any;
  protected achievements: any;
  protected conditions = [
    ['ValueGreaterThan', '<'],
    ['ValueLessThan', '>'],
    ['ValueEqualTo', '='],
    ['ValueGreaterThanOrEqualTo', '<='],
    ['ValueLessThanOrEqualTo', '>='],
    ['ValueOutsideOfRange', 'out of range'],
    ['ValueInsideOfRange', 'inside range']
  ];

  constructor(private service: GamificationEngineService) {}

  form: FormGroup = new FormGroup({
    game: new FormControl,
    evaluableAction: new FormControl,
    achievement: new FormControl,
    ruleType: new FormControl('simple'),
    startDate: new FormControl,
    endDate: new FormControl,
    name: new FormControl,
    repetitions: new FormControl,
    achievementAssignmentMessage: new FormControl,
    allowRepetitions: new FormControl,
    achievementAssignmentUnits: new FormControl,
    achievementAssignmentCondition: new FormControl,
    achievementAssignmentParameters: new FormControl
  });

  ngOnInit(){
    this.service.getEvaluableActions().subscribe((result) => {
      this.evaluableActions = result;
    });
    this.service.getGames().subscribe((result) => {
      let games: any = result;
      let finalGames = [];
      for (let game in games){
        if(games[game].state !== 'Finished') finalGames.push(games[game]);
      }
      if(finalGames.length !== 0) this.games = finalGames;
    });
    this.service.getAchievements().subscribe((result) => {
      this.achievements = result;
    });
  }

  protected onSubmit(){
    console.log('HOLA SUBMIT');
  }
}
