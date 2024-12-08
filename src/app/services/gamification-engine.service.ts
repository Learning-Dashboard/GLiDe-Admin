import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamificationEngineService {

  private gamificationUrl = 'http://localhost:8081/api'
  constructor(private http: HttpClient) {}

  postSimpleRule(name: string, repetitions: number, gameSubjectAcronym: string, gameCourse: number, gamePeriod: string, evaluableActionId: string, achievementId: number, achievementAssignmentMessage: string, achievementAssignmentOnlyFirstTime: boolean, achievementAssignmentCondition: string, achievementAssignmentConditionParameters: any[], achievementAssignmentUnits: number, achievementAssignmentAssessmentLevel: string){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('repetitions', String(repetitions));
    formData.append('gameSubjectAcronym', gameSubjectAcronym);
    formData.append('gameCourse', String(gameCourse));
    formData.append('gamePeriod', gamePeriod);
    formData.append('evaluableActionId', evaluableActionId);
    formData.append('achievementId', String(achievementId));
    formData.append('achievementAssignmentMessage', achievementAssignmentMessage);
    formData.append('achievementAssignmentOnlyFirstTime', String(achievementAssignmentOnlyFirstTime));
    formData.append('achievementAssignmentCondition', achievementAssignmentCondition);
    formData.append('achievementAssignmentConditionParameters', JSON.stringify(achievementAssignmentConditionParameters));
    formData.append('achievementAssignmentUnits', String(achievementAssignmentUnits));
    formData.append('achievementAssignmentAssessmentLevel', achievementAssignmentAssessmentLevel);
    return this.http.post(this.gamificationUrl + '/rules/simples', formData, {observe: 'response'});
  }

  postDateRule(name: string, repetitions: number, gameSubjectAcronym: string, gameCourse: number, gamePeriod: string, evaluableActionId: string, achievementId: number, achievementAssignmentMessage: string, achievementAssignmentOnlyFirstTime: boolean, achievementAssignmentCondition: string, achievementAssignmentConditionParameters: any[], achievementAssignmentUnits: number, achievementAssignmentAssessmentLevel: string, startDate: string, endDate: string){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('repetitions', String(repetitions));
    formData.append('gameSubjectAcronym', gameSubjectAcronym);
    formData.append('gameCourse', String(gameCourse));
    formData.append('gamePeriod', gamePeriod);
    formData.append('evaluableActionId', evaluableActionId);
    formData.append('achievementId', String(achievementId));
    formData.append('achievementAssignmentMessage', achievementAssignmentMessage);
    formData.append('achievementAssignmentOnlyFirstTime', String(achievementAssignmentOnlyFirstTime));
    formData.append('achievementAssignmentCondition', achievementAssignmentCondition);
    formData.append('achievementAssignmentConditionParameters', JSON.stringify(achievementAssignmentConditionParameters));
    formData.append('achievementAssignmentUnits', String(achievementAssignmentUnits));
    formData.append('achievementAssignmentAssessmentLevel', achievementAssignmentAssessmentLevel);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate)
    return this.http.post(this.gamificationUrl + '/rules/dates', formData, {observe: 'response'});
  }
  postAchievement(name: string, image: File, category: string){
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('icon', image);
    formData.append('category', category);
    return this.http.post(this.gamificationUrl + '/achievements', formData, {observe: 'response'});
  }

  getAchievements(){
    return this.http.get(this.gamificationUrl + '/achievements');
  }

  getEvaluableActions(){
    return this.http.get(this.gamificationUrl + '/evaluableActions');
  }

  getGames(){
    return this.http.get(this.gamificationUrl + '/games');
  }

  getSimpleRules(gameSubjectAcronym: string, gameCourse: string, gamePeriod: string){
    return this.http.get(this.gamificationUrl + '/rules/simples?gameSubjectAcronym=' + gameSubjectAcronym + '&gameCourse=' + gameCourse + '&gamePeriod=' + gamePeriod);
  }

  getDateRules(gameSubjectAcronym: string, gameCourse: string, gamePeriod: string){
    return this.http.get(this.gamificationUrl + '/rules/dates?gameSubjectAcronym=' + gameSubjectAcronym + '&gameCourse=' + gameCourse + '&gamePeriod=' + gamePeriod);
  }

  postLeaderboard(name: string, startDate: string, endDate: string, assessmentLevel: string, extent: string, anonymization: string, studentVisible: boolean, gameSubjectAcronym: string, gameCourse: number, gamePeriod: string, achievementId: number){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('assessmentLevel', assessmentLevel);
    formData.append('extent', extent);
    formData.append('anonymization', anonymization);
    formData.append('studentVisible', String(studentVisible));
    formData.append('gameSubjectAcronym', gameSubjectAcronym);
    formData.append('gameCourse', String(gameCourse));
    formData.append('gamePeriod', gamePeriod);
    formData.append('achievementId', String(achievementId));
    return this.http.post(this.gamificationUrl + '/leaderboards', formData, {observe: 'response'});
  }
}
