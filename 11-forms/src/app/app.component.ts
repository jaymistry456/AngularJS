import { Component } from '@angular/core';

import { LoginTemplateDrivenComponent } from './auth/login-template-driven/login.-template-driven.component';
import { LoginReactiveComponent } from './auth/login-reactive/login-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginTemplateDrivenComponent, LoginReactiveComponent],
})
export class AppComponent {}
