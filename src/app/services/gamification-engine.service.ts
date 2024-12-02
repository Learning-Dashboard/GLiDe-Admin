import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamificationEngineService {

  private gamificationUrl = 'http://localhost:8081/api'
  constructor(private http: HttpClient) {}

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
