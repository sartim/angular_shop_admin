import {NgIterable} from '@angular/core';

export class Product {
    next!: string;
    previous!: string;
    count!: number;
    results!: NgIterable<any>;
}

export class ProductDetail {
  id!: string;
  name!: string;
  brand!: string;
  category!: {
      id: string,
      name: string
  }
  items!: number;
  // tslint:disable-next-line:variable-name
  image_urls!: string;
  price!: number;
  // tslint:disable-next-line:variable-name
  created_at!: string;
  // tslint:disable-next-line:variable-names
  updated_at!: string;
}
