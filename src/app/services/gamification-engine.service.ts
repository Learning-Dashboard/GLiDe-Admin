import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamificationEngineService {

  private gamificationUrl = 'http://localhost:8081/api'
  constructor(private http: HttpClient) {}

  postSimpleRule(name: string, repetitions: number, gameSubjectAcronym: string, gameCourse: number, gamePeriod: string, evaluableActionId: string, achievementId: number, achievementAssignmentMessage: string, achievementAssignmentOnlyFirstTime: boolean, achievementAssignmentCondition: string, achievementAssignmentConditionParameters: any[], achievementAssignmentUnits: number, achievementAssignmentAssessmentLevel: string){
    /*
    const body = {
      'name': name,
      'repetitions': repetitions,
      'gameSubjectAcronym': gameSubjectAcronym,
      'gameCourse': gameCourse,
      'gamePeriod': gamePeriod,
      'evaluableActionId': evaluableActionId,
      'achievementId': achievementId,
      'achievementAssignmentMessage': achievementAssignmentMessage,
      'achievementAssignmentOnlyFirstTime': achievementAssignmentOnlyFirstTime,
      'achievementAssignmentCondition': achievementAssignmentCondition,
      'achievementAssignmentConditionParameters': achievementAssignmentConditionParameters,
      'achievementAssignmentUnits': achievementAssignmentUnits,
      'achievementAssignmentAssessmentLevel': achievementAssignmentAssessmentLevel
    }
     */
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
    /*
    const body = {
      'name': name,
      'repetitions': repetitions,
      'gameSubjectAcronym': gameSubjectAcronym,
      'gameCourse': gameCourse,
      'gamePeriod': gamePeriod,
      'evaluableActionId': evaluableActionId,
      'achievementId': achievementId,
      'achievementAssignmentMessage': achievementAssignmentMessage,
      'achievementAssignmentOnlyFirstTime': achievementAssignmentOnlyFirstTime,
      'achievementAssignmentCondition': achievementAssignmentCondition,
      'achievementAssignmentConditionParameters': achievementAssignmentConditionParameters,
      'achievementAssignmentUnits': achievementAssignmentUnits,
      'achievementAssignmentAssessmentLevel': achievementAssignmentAssessmentLevel,
      'startDate': startDate,
      'endDate': endDate
    }
     */
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
}
