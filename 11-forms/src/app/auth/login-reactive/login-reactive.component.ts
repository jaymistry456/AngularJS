import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// validators must return null if the value is valid and an error object if it is invalid
function mustContainQuestionMark(control: AbstractControl) {
  if(control.value.contains('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function isEmailUnique(control: AbstractControl) {
  if(control.value !== "test@example.com") {
    return of(null);
  }
  return of({ emailNotUnique: true });
}

let initailEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form')
if(savedForm) {
  initailEmailValue = JSON.parse(savedForm).email;
}


@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
})
export class LoginReactiveComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initailEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [isEmailUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), mustContainQuestionMark],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form', JSON.stringify({email: value.email})
        )
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {}
}
