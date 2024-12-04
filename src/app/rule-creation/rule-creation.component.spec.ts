import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleCreationComponent } from './rule-creation.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('RuleCreationComponent', () => {
  let component: RuleCreationComponent;
  let fixture: ComponentFixture<RuleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleCreationComponent],
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
