import { Component, signal } from '@angular/core';
import { RectComponent } from "./rect/rect.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rectangle',
  standalone: true,
  imports: [FormsModule, RectComponent],
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.css'
})
export class RectangleComponent {
  rectSize = signal({ width: '200', height: '100' });
}
