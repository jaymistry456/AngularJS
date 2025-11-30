import { AfterViewInit, Component, ElementRef, OnInit, output, signal, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  add = output<{title: string, request: string}>();

  enteredTitle = signal('');
  enteredText = signal('');

  ngOnInit(): void {
    // The below logs will be printed with viewChild() signal but not the decorator @ViewChild
    console.log("Inside NewTicketComponent ngOnInit");
    console.log(this.form()?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("Inside NewTicketComponent ngAfterViewInit");
    console.log(this.form()?.nativeElement);
  }

  // onSubmit(titleInput: string, textInput: string) {
  //   this.add.emit({title: titleInput, request: textInput});
  //   console.log(titleInput);
  //   console.log(textInput);
  //   this.form()?.nativeElement.reset();
  // }

  onSubmit() {
    this.add.emit({title: this.enteredTitle(), request: this.enteredText()});
    this.enteredTitle.set('');
    this.enteredText.set('');
  }
}
