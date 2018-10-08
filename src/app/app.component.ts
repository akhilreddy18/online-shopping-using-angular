import { Component, OnInit } from '@angular/core';
import { ShirtModel } from './services/models/shirt.model';
import { MockShirtDetailsService } from './services/mock-shirt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  display: boolean = false;
  shirtDetails: ShirtModel[] = [];

  constructor(public mockShirtDetailsService: MockShirtDetailsService) {

    if (localStorage.getItem('cartDetails') && localStorage.getItem('count')) {
      this.mockShirtDetailsService.cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
      this.mockShirtDetailsService.cartDetailsCount = JSON.parse(localStorage.getItem('count'));
      this.getTotalCount(this.mockShirtDetailsService.cartDetails);
    }
  }

  ngOnInit() {

  }

  cartDetails() {
    this.display = true;
    this.shirtDetails = this.mockShirtDetailsService.cartDetails;
  }

  removeItem(list: ShirtModel) {
    const index = this.mockShirtDetailsService.cartDetails.indexOf(list);
    if (index >= 0) {
      this.mockShirtDetailsService.cartDetails.splice(index, 1);
      this.mockShirtDetailsService.cartDetailsCount -= list.quantity;
      localStorage.setItem('cartDetails', JSON.stringify(this.mockShirtDetailsService.cartDetails));
      localStorage.setItem('count', JSON.stringify(this.mockShirtDetailsService.cartDetailsCount));
      this.getTotalCount(this.mockShirtDetailsService.cartDetails);
      if (this.mockShirtDetailsService.cartDetails.length === 0) {
        this.display = false;
        return;
      }

    }

  }

  getTotalCount(list: any) {
    this.mockShirtDetailsService.totalCount = list.reduce((sum, item) => sum + (item.price*item.quantity), 0);
    this.mockShirtDetailsService.cartDetailsCount = list.reduce((sum, item) => sum + item.quantity, 0);
  }

  quantityChange() {
    this.getTotalCount(this.mockShirtDetailsService.cartDetails);
    localStorage.setItem('cartDetails', JSON.stringify(this.mockShirtDetailsService.cartDetails));
    localStorage.setItem('count', JSON.stringify(this.mockShirtDetailsService.cartDetailsCount));
   

  }



}
