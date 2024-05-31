import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { PopupComponent } from '../../ui/popup/popup.component';

@Component({
  standalone: true,
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  imports: [PopupComponent],
})
export class ConfirmComponent {
  @ViewChild('confirmButton') confirmButton: ElementRef<HTMLButtonElement>;
  @ViewChild('cancelButton') cancelButton: ElementRef<HTMLButtonElement>;

  constructor(public confirmService: ConfirmService) {}

  public confirm(answer: boolean): void {
    this.confirmService.respond(answer);
  }
}
