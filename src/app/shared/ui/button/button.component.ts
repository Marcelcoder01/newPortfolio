import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="button"
      [class.button--ghost]="variant === 'ghost'"
      (click)="clicked.emit($event)"
    >
      <ng-content />
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'ghost' = 'primary';
  @Output() readonly clicked = new EventEmitter<Event>();
}


