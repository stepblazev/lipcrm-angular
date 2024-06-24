import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IOption, SelectComponent } from 'src/app/components/ui/select/select.component';

@Component({
  selector: 'app-admins-storage',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './admins-storage.component.html',
})
export class AdminsStorageComponent implements OnInit {
    @Input() storage: number;
    
    public options: IOption<number>[] = [
        { value: 1, caption: '1 ГБ' },
        { value: 2, caption: '2 ГБ' },
        { value: 3, caption: '3 ГБ' },
        { value: 4, caption: '4 ГБ' },
        { value: 5, caption: '5 ГБ' },
        { value: 6, caption: '6 ГБ' },
        { value: 7, caption: '7 ГБ' },
        { value: 8, caption: '8 ГБ' },
        { value: 9, caption: '9 ГБ' },
        { value: 10, caption: '10 ГБ' },
        { value: 12, caption: '12 ГБ' },
        { value: 15, caption: '15 ГБ' },
        { value: 20, caption: '20 ГБ' },
        { value: 25, caption: '25 ГБ' },
        { value: 50, caption: '50 ГБ' },
    ]
    @Input() current: IOption<number>;
    
    constructor() {}
    
    ngOnInit(): void {
        this.current = this.options.find(option => option.value == this.storage) || this.options[0];
    }

    public setCurrent(value: IOption<number>): void {
        this.current = value;
    }
}
