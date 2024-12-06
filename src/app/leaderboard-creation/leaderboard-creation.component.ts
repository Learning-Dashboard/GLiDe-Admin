import { Component } from '@angular/core';
import {GamificationEngineService} from '../services/gamification-engine.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-leaderboard-creation',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]],
  templateUrl: './leaderboard-creation.component.html',
  standalone: true,
  styleUrl: './leaderboard-creation.component.css'
})
export class LeaderboardCreationComponent {
  games: any;
  achievements: any;
  constructor(private service: GamificationEngineService) {}

  form: FormGroup = new FormGroup({
    game: new FormControl,
    achievement: new FormControl,
    name: new FormControl,
    startDate: new FormControl,
    endDate: new FormControl,
    assessmentLevel: new FormControl,
    anonymization: new FormControl,
    studentVisible: new FormControl(false)
  });

  ngOnInit(){
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

  resetForm(){
    this.form.reset();
    this.form.get('studentVisible')?.setValue(false);
  }

  onSubmit(){
    let game = this.form.get('game')?.value;
    let startDate = this.form.get('startDate')?.value;
    let endDate = this.form.get('endDate')?.value;
    startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())
    startDate = startDate.toJSON().substring(0,10);
    endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())
    endDate = endDate.toJSON().substring(0,10);

    this.service.postLeaderboard(
      this.form.get('name')?.value,
      startDate,
      endDate,
      this.form.get('assessmentLevel')?.value,
      'Subject',
      this.form.get('anonymization')?.value,
      this.form.get('studentVisible')?.value,
      game.subjectAcronym,
      game.course,
      game.period,
      this.form.get('achievement')?.value
    ).subscribe((result) =>{
      console.log(result.status);
      if (result.status === 201){
        this.resetForm();
      }
    });
  }
}
