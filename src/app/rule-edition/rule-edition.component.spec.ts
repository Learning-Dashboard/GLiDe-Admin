import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEditionComponent } from './rule-edition.component';

describe('RuleEditionComponent', () => {
  let component: RuleEditionComponent;
  let fixture: ComponentFixture<RuleEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
