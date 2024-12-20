import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditionComponent } from './game-edition.component';

describe('GameEditionComponent', () => {
  let component: GameEditionComponent;
  let fixture: ComponentFixture<GameEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
