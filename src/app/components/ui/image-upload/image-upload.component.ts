import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { getFileSize } from 'src/app/shared/utils/file-size';

type placeholderPositions = 'left' | 'right';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent implements OnChanges {
  public imageSrc: string | ArrayBuffer | null = null;
  public isHovering = false;

  @Input() file: File | null = null;
  @Input() placeholder?: string;
  @Input() placeholderPosition?: placeholderPositions = 'right';

  @Output() imageChanged = new EventEmitter<File | null>();

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | null = null;

  getFileSize = getFileSize;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file']) {
      this.readFile(changes['file'].currentValue);
    }
  }

  public onClick(): void {
    if (!this.file) {
      if (this.fileInput) {
        this.fileInput.nativeElement.click();
      }
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.readFile(file);
      this.imageChanged.emit(file);
    } else {
      this.imageChanged.emit(null);
    }
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovering = true;
  }

  public onDragLeave(): void {
    this.isHovering = false;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering = false;

    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files[0]
    ) {
      const file = event.dataTransfer.files[0];
      this.readFile(file);
      this.imageChanged.emit(file);
    }
  }

  public deleteHandler(event: Event): void {
    event.stopPropagation();
    this.file = null;
    this.imageSrc = null;
    this.imageChanged.emit(null);
  }

  private readFile(file: File): void {
    if (!file) return;

    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  public mainIcon = faUser;
  public deleteIcon = faTrashCan;
}
