import {NgIterable} from '@angular/core';

export class Product {
    count!: number;
    results!: NgIterable<any>;
}

export class ProductDetail {
  id!: string;
  name!: string;
  brand!: string;
  items!: number;
  // tslint:disable-next-line:variable-name
  image_urls!: string;
  price!: number;
}
