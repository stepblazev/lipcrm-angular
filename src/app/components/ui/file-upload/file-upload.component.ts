import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faFileLines, faUpload } from '@fortawesome/free-solid-svg-icons';
import { getFileSize } from 'src/app/shared/utils/file-size';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input() accept: string = '*';
  @Input() title: string = '';
  @Input() subtitle: string = '';

  @Input() file: File | null = null;
  @Output() fileChange = new EventEmitter<File | null>();

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  public isHovering = false;
  public imageSrc: string | ArrayBuffer | null = null;

  public getFileSize = getFileSize;
  
  public onClick(): void {
    if (!this.file) {
      this.fileInput.nativeElement.click();
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.handleFile(file);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = true;
  }

  public onDragLeave(): void {
    this.isHovering = false;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = false;
    const file = event.dataTransfer?.files?.[0] || null;
    this.handleFile(file);
  }

  public deleteFile(event: Event): void {
    event.stopPropagation();
    this.handleFile(null);
  }

  public getFormattedDate(timestamp: number): string {
    if (!timestamp) return 'Неизвестно';
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private handleFile(file: File | null): void {
    this.file = file;
    this.fileChange.emit(file);
    if (file && file.type.startsWith('image')) {
      this.readImage(file);
    } else {
      this.imageSrc = null;
    }
  }
  
  private readImage(file: File): void {
    this.file = file;

    if (file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target!.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageSrc = null;
    }
  }

  public fileIcon = faFileLines;
  public uploadIcon = faUpload;
  public deleteIcon = faTrashCan;
}
