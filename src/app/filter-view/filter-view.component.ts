import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MockShirtDetailsService } from '../services/mock-shirt.service';


@Component({
  selector: 'app-filter-view',
  templateUrl: './filter-view.component.html',
  styleUrls: ['./filter-view.component.css']
})
export class FilterViewComponent implements OnInit, OnChanges {


  @Input() colorsData = [];
  @Input() sizeData = [];
  @Output() filterData = new EventEmitter();

  selectedColor: string[] = [];
  selectedSize: string[] = [];

  constructor(private mockShirtDetailsService: MockShirtDetailsService) {

  }

  ngOnInit() {
    this.getfilterDetails();
  }
  ngOnChanges() {
  }

  getValues() {
    let data: any = [];
    this.mockShirtDetailsService.selectedColor = this.selectedColor;
    this.mockShirtDetailsService.selectedSize = this.selectedSize;
    data.colors = this.selectedColor;
    data.size = this.selectedSize;
    this.filterData.emit(data);

  }

  getfilterDetails() {
    
    if (this.mockShirtDetailsService.selectedColor.length > 0 || this.mockShirtDetailsService.selectedSize.length > 0) {
      this.selectedColor = this.mockShirtDetailsService.selectedColor;
      this.selectedSize = this.mockShirtDetailsService.selectedSize;
    }
  }

}
