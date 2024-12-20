import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCheckbox} from '@angular/material/checkbox';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-rule-edition',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    MatCheckbox,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatHint,
    MatIcon,
    MatInput,
    MatMiniFabButton,
    MatSelectTrigger,
    MatStartDate,
    MatSuffix,
    MatButton
  ],
  templateUrl: './rule-edition.component.html',
  styleUrl: './rule-edition.component.css'
})
export class RuleEditionComponent {

  @Input() rules: any;
  @Input() ruleType: any;
  @Input() achievements: any;
  @Input() evaluableActions: any;

  selectedRule: any;
  selectedEvaluableAction: any;
  protected conditions = [
    ['ValueGreaterThan', '>'],
    ['ValueLessThan', '<'],
    ['ValueEqualTo', '='],
    ['ValueGreaterThanOrEqualTo', '>='],
    ['ValueLessThanOrEqualTo', '<='],
    ['ValueOutsideOfRange', 'out of range'],
    ['ValueInsideOfRange', 'inside range']
  ];

  ruleForm: FormGroup = new FormGroup({
    rule: new FormControl,
    evaluableAction: new FormControl,
    achievement: new FormControl,
    startDate: new FormControl,
    endDate: new FormControl,
    name: new FormControl,
    repetitions: new FormControl,
    achievementAssignmentMessage: new FormControl,
    onlyFirstTime: new FormControl,
    achievementAssignmentUnits: new FormControl,
    achievementAssignmentCondition: new FormControl,
    achievementAssignmentParameters: new FormArray([new FormControl()])
  });

  get achievementAssignmentParameters(){
    return this.ruleForm.get("achievementAssignmentParameters") as FormArray;
  }

  addAchievementAssignmentParameter(){
    this.achievementAssignmentParameters.push(new FormControl('', Validators.required));
  }

  removeAchievementAssignmentParameter(i: number){
    this.achievementAssignmentParameters.removeAt(i);
  }

  protected conditionChange(){
    if (this.ruleForm.get('achievementAssignmentCondition')?.value !== 'ValueInsideOfRange' && this.ruleForm.get('achievementAssignmentCondition')?.value !== 'ValueOutsideOfRange') {
      const parameters = this.ruleForm.controls['achievementAssignmentParameters'] as FormArray;
      const firstValue = parameters.at(0);
      parameters.clear();
      parameters.push(firstValue);
    }
  }

  selectRule(){
    let rule = this.ruleForm.get('rule')?.value;
    this.selectedRule = rule;
    this.ruleForm.get('name')?.setValue(rule.name);
    this.ruleForm.get('startDate')?.setValue(rule.startDate);
    this.ruleForm.get('endDate')?.setValue(rule.endDate);
    this.ruleForm.get('achievement')?.setValue(rule.achievementId);
    this.ruleForm.get('evaluableAction')?.setValue(rule.evaluableActionId);
    this.ruleForm.get('repetitions')?.setValue(rule.repetitions);
    this.ruleForm.get('achievementAssignmentMessage')?.setValue(rule.achievementAssignmentMessage);
    this.ruleForm.get('onlyFirstTime')?.setValue(rule.achievementAssignmentOnlyFirstTime);
    this.ruleForm.get('achievementAssignmentUnits')?.setValue(rule.achievementAssignmentUnits);
    this.ruleForm.get('achievementAssignmentCondition')?.setValue(rule.achievementAssignmentCondition);
    this.ruleForm.get('achievementAssignmentParameters')?.setValue(rule.achievementAssignmentConditionParameters);
    this.selectEvaluableAction();
  }

  selectEvaluableAction(){
    this.selectedEvaluableAction = this.evaluableActions.find((evaluableAction: any) =>
      evaluableAction.id === this.ruleForm.get('evaluableAction')?.value);
  }

  editRule(){

  }

  deleteRule(){

  }

}
