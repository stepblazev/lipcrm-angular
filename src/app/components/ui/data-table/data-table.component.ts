import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { isDateString } from 'src/app/shared/utils/is-date-string';

export interface IDataTableColumn {
  alias: string;
  key: string;
  sort: boolean;
}

@Component({
  standalone: true,
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [CommonModule, MatCheckboxModule, MatTableModule, MatSortModule],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: object[];
  @Input() columns: IDataTableColumn[];
  @Input() allowSelect: boolean = false;
  @Input() selectedRows: number[] = [];

  @Output() dblClickItem = new EventEmitter<object>();
  @Output() changeSelect = new EventEmitter<number[]>();

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [];

  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
        this.dataSource = new MatTableDataSource<any>(changes['data'].currentValue);
        this.setSelectForAll(false);
    }
    if (changes['selectedRows']) {
        this.selectedRows = changes['selectedRows'].currentValue;
    }
  }
  
  ngOnInit(): void {
    if (this.allowSelect) {
      this.displayedColumns = ['select', ...this.columns.map((col) => col.key)];
    } else {
      this.displayedColumns = this.columns.map((col) => col.key);
    }
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  ngAfterViewInit(): void {
    if (this.sort) this.dataSource.sort = this.sort;
  }

  public convertTypes(value: any): string {
    switch (true) {
      case value instanceof Date || isDateString(value):
        return new Date(value).toLocaleDateString('ru-RU');
      default:
        return value;
    }
  }

  public toggleSelect(selectedId: number): void {
    if (!this.allowSelect) return;

    if (!this.selectedRows.includes(selectedId)) {
      this.changeSelect.emit([...this.selectedRows, selectedId]);
    } else {
      this.changeSelect.emit(this.selectedRows.filter((id) => id != selectedId));
    }
  }

  public setSelectForAll(state: boolean): void {
    if (!this.allowSelect) return;
    this.changeSelect.emit(state ? this.dataSource.data.map((row) => row.id) : []);
  }
}
