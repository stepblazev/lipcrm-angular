import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export interface IOption<T> {
  value: T;
  caption: string;
  icon?: IconDefinition
}

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [CommonModule, FontAwesomeModule],
})
export class SelectComponent<T> {
  public isOpened: boolean = false;

  @Input() disabled: boolean = false;
  @Input() allowEmpty: boolean = true;

  @Input() options: IOption<T>[] = [];
  @Input() current: IOption<T> | undefined;

  @Output() valueChanged = new EventEmitter<IOption<T>>();

  constructor(private elRef: ElementRef) {}

  public setOption(option: IOption<T> | undefined) {
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
  
  public selectIcon = faCaretDown;
}
