import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
    @Input() id: string = 'app-checkbox';
    @Input() title: string = '';

    @Input() checked: boolean = false;
    @Output() valueChanged = new EventEmitter<boolean>();
  
    public update(state: boolean) {
      this.checked = state;
      this.valueChanged.emit(state);
    }
}
