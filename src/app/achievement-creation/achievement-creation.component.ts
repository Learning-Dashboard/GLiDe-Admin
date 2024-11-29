import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-achievement-creation',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './achievement-creation.component.html',
  standalone: true,
  styleUrl: './achievement-creation.component.css'
})
export class AchievementCreationComponent {
  private srcResult: any;
  protected selectedFile: any;
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    category: new FormControl(),
  });

  protected onFileSelected(){
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      this.selectedFile = inputNode.files[0] ?? null;
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  protected onSubmit(){
    console.log(this.selectedFile?.name)
    console.log(this.form.get('name')?.value)
    console.log(this.form.get('category')?.value)
  }
}
