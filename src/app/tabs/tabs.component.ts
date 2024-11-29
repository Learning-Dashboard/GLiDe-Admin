import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-tabs',
  imports: [
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './tabs.component.html',
  standalone: true,
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

}
