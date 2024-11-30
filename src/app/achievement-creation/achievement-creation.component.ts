import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-achievement-creation',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './achievement-creation.component.html',
  standalone: true,
  styleUrl: './achievement-creation.component.css'
})
export class AchievementCreationComponent {
  protected imageUrl: any;
  protected selectedFile: any;
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    category: new FormControl(),
  });

  protected onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0){
      const file = input.files![0];
      if (file.type.startsWith('image/')){
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    }
  }

  protected deleteFile(){
    this.imageUrl = null;
    this.selectedFile = null;
  }

  protected onSubmit(){
    console.log(this.selectedFile?.name)
    console.log(this.form.get('name')?.value)
    console.log(this.form.get('category')?.value)
  }
}
