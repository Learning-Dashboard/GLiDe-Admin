import { Component } from '@angular/core';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {NgForOf, NgIf} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-rule-creation',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatRadioModule, NgForOf, NgIf, MatDatepickerModule, MatCheckboxModule, MatIcon],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]],
  templateUrl: './rule-creation.component.html',
  standalone: true,
  styleUrl: './rule-creation.component.css'
})
export class RuleCreationComponent {
  protected evaluableActions: any;
  protected games: any;
  protected achievements: any;
  protected conditions = [
    ['ValueGreaterThan', '>'],
    ['ValueLessThan', '<'],
    ['ValueEqualTo', '='],
    ['ValueGreaterThanOrEqualTo', '>='],
    ['ValueLessThanOrEqualTo', '<='],
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
    onlyFirstTime: new FormControl(false),
    achievementAssignmentUnits: new FormControl,
    achievementAssignmentCondition: new FormControl,
    achievementAssignmentParameters: new FormArray([new FormControl()])
  });

  get achievementAssignmentParameters(){
    return this.form.get("achievementAssignmentParameters") as FormArray;
  }

  addAchievementAssignmentParameter(){
    this.achievementAssignmentParameters.push(new FormControl);
  }

  removeAchievementAssignmentParameter(i: number){
    this.achievementAssignmentParameters.removeAt(i);
  }

  protected conditionChange(){
    if (this.form.get('achievementAssignmentCondition')?.value !== 'ValueInsideOfRange' && this.form.get('achievementAssignmentCondition')?.value !== 'ValueOutsideOfRange') {
      const parameters = this.form.controls['achievementAssignmentParameters'] as FormArray;
      const firstValue = parameters.at(0);
      parameters.clear();
      parameters.push(firstValue);
    }
  }

  private resetForm(){
    this.form.reset();
    this.form.get('ruleType')?.setValue('simple');
    this.conditionChange();
    this.form.get('onlyFirstTime')?.setValue(false);
  }

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
    console.log(this.form.get('game')?.value);
    console.log(this.form.get('evaluableAction')?.value);
    console.log(this.form.get('achievement')?.value);
    console.log(this.form.get('ruleType')?.value);
    console.log(this.form.get('startDate')?.value);
    console.log(this.form.get('endDate')?.value);
    console.log(this.form.get('name')?.value);
    console.log(this.form.get('repetitions')?.value);
    console.log(this.form.get('achievementAssignmentMessage')?.value);
    console.log(this.form.get('onlyFirstTime')?.value);
    console.log(this.form.get('achievementAssignmentUnits')?.value);
    console.log(this.form.get('achievementAssignmentCondition')?.value);
    console.log(this.form.get('achievementAssignmentParameters')?.value);

    let game = this.form.get('game')?.value;
    let evaluableAction = this.form.get('evaluableAction')?.value;
    let repetitions = Math.round(this.form.get('repetitions')?.value);
    let points = Math.round(this.form.get('achievementAssignmentUnits')?.value);
    if (this.form.get('ruleType')?.value === 'simple'){
      this.service.postSimpleRule(
        this.form.get('name')?.value,
        repetitions,
        game.subjectAcronym,
        game.course,
        game.period,
        evaluableAction.id,
        this.form.get('achievement')?.value,
        this.form.get('achievementAssignmentMessage')?.value,
        this.form.get('onlyFirstTime')?.value,
        this.form.get('achievementAssignmentCondition')?.value,
        this.form.get('achievementAssignmentParameters')?.value,
        points,
        evaluableAction.assessmentLevel
      ).subscribe((result) => {
        console.log(result.status);
        if(result.status === 201) {
          this.resetForm();
        }
      });
    }
    else if (this.form.get('ruleType')?.value === 'date'){
      let startDate = this.form.get('startDate')?.value;
      let endDate = this.form.get('endDate')?.value;
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())
      startDate = startDate.toJSON().substring(0,10);
      endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())
      endDate = endDate.toJSON().substring(0,10);
      this.service.postDateRule(
        this.form.get('name')?.value,
        repetitions,
        game.subjectAcronym,
        game.course,
        game.period,
        evaluableAction.id,
        this.form.get('achievement')?.value,
        this.form.get('achievementAssignmentMessage')?.value,
        this.form.get('onlyFirstTime')?.value,
        this.form.get('achievementAssignmentCondition')?.value,
        this.form.get('achievementAssignmentParameters')?.value,
        points,
        evaluableAction.assessmentLevel,
        startDate,
        endDate
      ).subscribe((result) => {
        console.log(result.status);
        if(result.status === 201) {
          this.resetForm();
        }
      });
    }
  }
}
