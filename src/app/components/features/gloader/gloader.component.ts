import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GloaderService } from 'src/app/shared/services/gloader.service';

@Component({
  selector: 'app-gloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gloader.component.html',
  styleUrl: './gloader.component.scss',
})
export class GloaderComponent {
  constructor(public readonly gloaderService: GloaderService) {}
}
