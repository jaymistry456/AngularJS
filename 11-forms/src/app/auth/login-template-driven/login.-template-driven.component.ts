import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-template-driven',
  standalone: true,
  templateUrl: './login-template-driven.component.html',
  styleUrl: './login-template-driven.component.css',
  imports: [FormsModule],
})
export class LoginTemplateDrivenComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const savedEmail = JSON.parse(savedForm).email;
        this.form().controls['email'].setValue(savedEmail);
      }

      const subscription = this.form()
        .form.valueChanges.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            );
          },
        });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    });
  }

  onSubmit(form: NgForm) {
    if (form.form.invalid) {
      return;
    }
    const enteredEmail = form.form.value.email;
    const enteredPassword = form.form.value.password;

    form.form.reset();
  }
}
