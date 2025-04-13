import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatError,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class FeedbackComponent {
  name = 'Feedback';
  formGroup: FormGroup;
  emailField: FormControl;
  feedbackField: FormControl;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore
  ) {
    this.emailField = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.feedbackField = new FormControl('', [
      Validators.required,
      Validators.minLength(25),
      Validators.maxLength(3000),
    ]);

    this.formGroup = new FormGroup({
      emailField: this.emailField,
      feedbackField: this.feedbackField,
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.invalid) {
      if (control.hasError('required')) {
        return 'Cannot be empty';
      }
      if (control.hasError('email')) {
        return 'Must be a valid email';
      }
      if (control.hasError('minlength')) {
        const limit = control.getError('minlength').requiredLength;
        return `Must be at least ${limit} characters`;
      }
      if (control.hasError('maxlength')) {
        const limit = control.getError('maxlength').requiredLength;
        return `Must be no more than ${limit} characters`;
      }
      return 'Invalid input';
    }

    return '';
  }

  async onSubmit() {
    console.log('Form submitted:', this.formGroup.value);
    console.log('Email:', this.emailField.value);
    console.log('Feedback:', this.feedbackField.value);
    console.log('Form Valid:', this.formGroup.valid);
    if (this.formGroup.valid) {
      console.log('Form is valid, submitting feedback...');
      const feedbacksCollection = collection(this.firestore, 'feedbacks');

      const feedbackData = {
        email: this.emailField.value,
        feedback: this.feedbackField.value,
        timestamp: serverTimestamp(),
      };

      try {
        console.log('Adding feedback to Firestore:', feedbackData);
        await addDoc(feedbacksCollection, feedbackData);
        this.formGroup.reset();
        this.snackBar.open('Feedback Submitted Successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
        this.snackBar.open('Error submitting feedback', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    }
  }
}
