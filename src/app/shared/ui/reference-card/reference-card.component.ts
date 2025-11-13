import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reference-card',
  standalone: true,
  templateUrl: './reference-card.component.html',
  styleUrls: ['./reference-card.component.scss']
})
export class ReferenceCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) description!: string;
  @Input() avatarUrl?: string | null;
  @Input() actionUrl?: string | null;
  @Input() actionLabel = 'Ver más';
}


