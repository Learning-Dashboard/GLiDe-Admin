import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardEditionComponent } from './leaderboard-edition.component';

describe('LeaderboardEditionComponent', () => {
  let component: LeaderboardEditionComponent;
  let fixture: ComponentFixture<LeaderboardEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});