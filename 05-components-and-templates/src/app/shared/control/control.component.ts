import { Component, contentChild, ContentChild, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  title = input<string>();
  private el = inject(ElementRef);
  // @ContentChild('input') private content?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private content = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  ngOnInit(): void {
    // The below logs will be printed with contentChild() signal but not the decorator @ContentChild
    console.log("Inside ControlComponent ngOnInit");
    console.log(this.content()?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("Inside ControlComponent ngAfterViewInit");
    console.log(this.content()?.nativeElement);
  }

  onClick() {
    console.log("clicked!");
    console.log(this.el);
    console.log(this.content());
  }
}
