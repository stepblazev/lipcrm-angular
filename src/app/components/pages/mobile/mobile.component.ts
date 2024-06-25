import { CommonModule, Location  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../ui/select/select.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOption } from '../../ui/multi-select/multi-select.component';
import { MobileFileComponent } from './mobile-file/mobile-file.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [CommonModule, SelectComponent, FormsModule, ReactiveFormsModule, MobileFileComponent, RouterLink],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss'
})
export class MobileComponent implements OnInit {
    public grsiForm: FormGroup;
    
    public current: IOption<string>;
    public options: IOption<string>[] = [];
    
    constructor(private fb: FormBuilder) {}
    
    ngOnInit(): void {
        // генерирует опции выбора времени с указанным шагом в минутах
        this.options = this.generateTimeOptions(30);
        this.current = this.options[0];
        
        this.grsiForm = this.fb.group({
            time: [this.current.value, [Validators.required]],
            file: [null, [Validators.required]],
        });
    }
    
    public send(event: Event): void {
        event.preventDefault();
        alert('Send xlsx...');
    }
    
    public setCurrentTime(option: IOption<string>): void {
        this.current = option;
        this.grsiForm.patchValue({
            time: option.value
        });
    }
    
    private generateTimeOptions(step: number): IOption<string>[] {
        const options: IOption<string>[] = [];
        for (let i = 0; i < 24 * 60; i += step) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            const value = `${this.padZero(hours)}:${this.padZero(minutes)}`;
            options.push({ value, caption: value });
        }
        return options;
    }
    
    private padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
}
