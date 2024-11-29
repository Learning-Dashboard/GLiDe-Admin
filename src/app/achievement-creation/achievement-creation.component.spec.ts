import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementCreationComponent } from './achievement-creation.component';

describe('AchievementCreationComponent', () => {
  let component: AchievementCreationComponent;
  let fixture: ComponentFixture<AchievementCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementCreationComponent]
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
