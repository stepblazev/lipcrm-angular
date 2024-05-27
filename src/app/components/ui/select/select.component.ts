import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface IOption<T> {
  caption: string;
  value: T;
  icon?: {
    spriteId?: string;
    color?: string;
  }
}

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [CommonModule],
})
export class SelectComponent {
  public isOpened: boolean = false;

  @Input() disabled: boolean = false;
  @Input() allowEmpty: boolean = true;

  @Input() options: IOption<any>[];
  @Input() current: IOption<any> | undefined;

  @Output() valueChanged = new EventEmitter<IOption<any>>();

  constructor(private elRef: ElementRef) {}

  public setOption(option: IOption<any> | undefined) {
    if (option == this.current || this.disabled) return;
    this.current = option;
    this.valueChanged.emit(option);
    this.setIsOpened(false);
  }

  public setIsOpened(state: boolean) {
    if (this.disabled) {
        this.isOpened = false;
        return;
    }
    this.isOpened = state;
  }

  @HostListener('body:click', ['$event'])
  public handleClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.setIsOpened(false);
    }
  }
}
