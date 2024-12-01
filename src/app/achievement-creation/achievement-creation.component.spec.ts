import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementCreationComponent } from './achievement-creation.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('AchievementCreationComponent', () => {
  let component: AchievementCreationComponent;
  let fixture: ComponentFixture<AchievementCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementCreationComponent],
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
