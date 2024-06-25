import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFile, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { faFileLines, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mobile-file',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './mobile-file.component.html',
  styleUrl: './mobile-file.component.scss'
})
export class MobileFileComponent {
    @Input() file: File | null = null;
    @Output() fileChanged = new EventEmitter<File | null>();
  
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | null = null;
  
    public isHovering = false;
  
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
        this.file = file;
        this.fileChanged.emit(file);
      } else {
        this.fileChanged.emit(null);
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
        this.file = file;
        this.fileChanged.emit(file);
      }
    }
  
    public deleteHandler(event: Event): void {
      event.stopPropagation();
      this.file = null;
      this.fileChanged.emit(null);
    }
    
    public getFileSize(bytes: number): string {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        const gigabyte = megabyte * 1024;
    
        if (bytes < kilobyte) {
            return `${bytes} Б`;
        } else if (bytes < megabyte) {
            return `${(bytes / kilobyte).toFixed(2)} КБ`;
        } else if (bytes < gigabyte) {
            return `${(bytes / megabyte).toFixed(2)} МБ`;
        } else {
            return `${(bytes / gigabyte).toFixed(2)} ГБ`;
        }
    }
  
    public getFormattedDate(timestamp: number): string {
        if (!timestamp) return 'Неизвестно';
        const date = new Date(timestamp);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    public fileIcon = faFileLines;
    public uploadIcon = faUpload;
    public deleteIcon = faTrashCan;
}
