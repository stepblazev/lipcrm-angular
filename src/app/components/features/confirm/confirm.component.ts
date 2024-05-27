import { Component } from '@angular/core';
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
  constructor(public confirmService: ConfirmService) {}

  public confirm(answer: boolean): void {
    this.confirmService.respond(answer);
  }
}
