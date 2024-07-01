import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

interface IDay {
    name: string;
    active: boolean;
    start_time: string;
    end_time: string;
}

interface ITimeWindow {
    start: number;
}

@Component({
    selector: 'app-workweek',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, FormsModule, CheckboxComponent],
    templateUrl: './workweek.component.html',
    styleUrl: './workweek.component.scss'
})
export class WorkweekComponent implements OnInit {
    public days: IDay[] = [
        { name: 'понедельник', active: true, start_time: '09:00', end_time: '21:00' },
        { name: 'вторник', active: true, start_time: '09:00', end_time: '21:00' },
        { name: 'среда', active: true, start_time: '09:00', end_time: '21:00' },
        { name: 'четверг', active: true, start_time: '09:00', end_time: '21:00' },
        { name: 'пятница', active: true, start_time: '09:00', end_time: '21:00' },
        { name: 'суббота', active: false, start_time: '09:00', end_time: '21:00' },
        { name: 'воскресенье', active: false, start_time: '09:00', end_time: '21:00' },
    ];

    public windows: ITimeWindow[] = [];
    public windowsCount: number = 4;

    constructor(private ls: LocalStorageService) { }
    
    ngOnInit(): void {
        this.days = this.ls.getItem<IDay[]>('workweek') ?? this.days;
    }

    public update(): void {
        this.ls.setItem('workweek', this.days);
    }
    
    public setActive(index: number, active: boolean): void {
        this.days[index].active = active;
        this.update();
    }

    public weekIcon = faCalendar;
}
