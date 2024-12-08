import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {AchievementCreationComponent} from '../achievement-creation/achievement-creation.component';
import {RuleCreationComponent} from '../rule-creation/rule-creation.component';
import {LeaderboardCreationComponent} from '../leaderboard-creation/leaderboard-creation.component';
import {GameCreationComponent} from '../game-creation/game-creation.component';

@Component({
  selector: 'app-tabs',
  imports: [
    MatTabsModule,
    MatIconModule,
    AchievementCreationComponent,
    RuleCreationComponent,
    LeaderboardCreationComponent,
    GameCreationComponent
  ],
  templateUrl: './tabs.component.html',
  standalone: true,
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
