import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardCreationComponent } from './leaderboard-creation.component';

describe('LeaderboardCreationComponent', () => {
  let component: LeaderboardCreationComponent;
  let fixture: ComponentFixture<LeaderboardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
