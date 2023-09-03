import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  name = 'Feedback';
  formGroup: FormGroup;
  emailField: FormControl;
  feedbackField: FormControl;

  constructor(private snackBar: MatSnackBar) {
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

  onSubmit() {
    this.formGroup.reset();
    this.snackBar.open('Feedback Submitted Successfully', 'Close', {
      duration: 3000, 
      verticalPosition: 'bottom',
    });
  }
}
