import { Component, OnInit, Output } from '@angular/core';
import { MockShirtDetailsService } from '../services/mock-shirt.service';
import { ShirtModel } from '../services/models/shirt.model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  shirtDetails: ShirtModel[];
  colorlist = [];
  sizelist = [];
  isProductView: boolean = false;
  addCartDetails: ShirtModel[] = [];
  filteredshirtDetails: ShirtModel[];
  isAddMore: boolean = false;
  selectedProductDetails: ShirtModel;

  constructor(private mockShirtDetailsService: MockShirtDetailsService) {

  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    // get the details from end point url
    this.mockShirtDetailsService.getShirtDetails().subscribe((res: any) => {
      if (res.length > 0) {
        this.shirtDetails = res;
        this.filteredshirtDetails = res;

        // get the all colours from list
        const colors = [];
        res.forEach(element => {
          colors.push(element.colour);
        });
        // remove duplicate and get uniue values from list
        this.colorlist = Array.from(new Set(colors));

        // get the all size's from list
        const size = [];
        res.forEach(element => {
          size.push(element.size);
        });
        // remove duplicate and get uniue values from list
        this.sizelist = Array.from(new Set(size));
      }

    })
  }

  filterChange(event) {
    // filter an array lst with colors or size.
    this.shirtDetails = this.filteredshirtDetails.filter(s =>
      (event.colors.length === 0 || event.colors.filter(x => x === s.colour)[0] === s.colour) &&
      (event.size.length === 0 || event.size.filter(x => x === s.size)[0] === s.size)
    )

  }


  selectedProduct(details: ShirtModel) {
    this.selectedProductDetails = details;
    this.isProductView = true;
    const filterObj = this.mockShirtDetailsService.cartDetails.filter(x => x.id === details.id);
    const index = this.mockShirtDetailsService.cartDetails.map(s => { return s }).indexOf(filterObj[0]);
    if (index >= 0) {
      this.isAddMore = true;
    }

  }

  addToCart() {
debugger;
    const filterObj = this.mockShirtDetailsService.cartDetails.filter(x => x.id === this.selectedProductDetails.id);
    const index = this.mockShirtDetailsService.cartDetails.map(s => { return s }).indexOf(filterObj[0]);
    this.isAddMore = true;
    if (index >= 0) {
      this.mockShirtDetailsService.cartDetails[index].quantity += 1;
      this.mockShirtDetailsService.cartDetailsCount += 1;
    } else {
      this.selectedProductDetails.quantity = 1;
      this.mockShirtDetailsService.cartDetailsCount += 1;
      this.mockShirtDetailsService.cartDetails.push(this.selectedProductDetails);
    }

    this.mockShirtDetailsService.totalCount = this.mockShirtDetailsService.cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    localStorage.setItem('cartDetails', JSON.stringify(this.mockShirtDetailsService.cartDetails));
    localStorage.setItem('count', JSON.stringify(this.mockShirtDetailsService.cartDetailsCount));

  }

}
