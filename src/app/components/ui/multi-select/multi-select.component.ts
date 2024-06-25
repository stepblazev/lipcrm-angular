import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface IOption<T> {
  value: T;
  caption: string;
  icon?: IconDefinition
}

@Component({
  standalone: true,
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  imports: [CommonModule, FontAwesomeModule],
})
export class MultiSelectComponent<T> {
  public isOpened: boolean = false;

  @Input() disabled: boolean = false;

  @Input() options: IOption<T>[] = [];
  @Input() currents: IOption<T>[] = [];

  @Output() valueChanged = new EventEmitter<IOption<T>[]>();

  constructor(private elRef: ElementRef) {}

  public toggleOption(option: IOption<T>) {
    if (this.disabled) return;
    
    if (this.currents.includes(option)) {
        this.currents = this.currents.filter(current => current.value !== option.value);
    } else {
        this.currents = [option, ...this.currents];
    }
    
    this.valueChanged.emit(this.currents);
  }

  public getJoined(): string {
    return this.currents.map(option => option.caption).join(', ');
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
  public checkIcon = faCheck;
}
