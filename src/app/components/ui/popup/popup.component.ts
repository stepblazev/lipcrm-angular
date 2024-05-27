import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  animations: [
    trigger('popupState', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(-40px)' })),
      transition('visible => hidden', animate('300ms ease')),
      transition('hidden => visible', animate('300ms ease')),
    ]),
    trigger('backdropState', [
      state('visible', style({ backdropFilter: 'blur(4px)', opacity: 1 })),
      state('hidden', style({ backdropFilter: 'blur(0px)', opacity: 0 })),
      transition('visible => hidden', animate('300ms ease')),
      transition('hidden => visible', animate('300ms ease')),
    ]),
  ],
  imports: [CommonModule],
})
export class PopupComponent implements OnInit {
  @Input() isOpened: boolean = false;
  @Output() closeEvent = new EventEmitter();

  constructor() {}

  public closeModal() {
    this.isOpened = false;
    this.closeEvent.emit();
  }

  ngOnInit(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isOpened) {
        this.closeModal();
      }
    });
  }
}
