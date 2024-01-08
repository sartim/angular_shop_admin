import {NgIterable} from '@angular/core';

export class Category {
  next!: string;
  previous!: string;
  count!: number;
  results!: NgIterable<any>;
}

export class CategoryDetail {
  id!: string;
  name!: string;
  slug!: string;
  // tslint:disable-next-line:variable-name
  created_at!: string;
  // tslint:disable-next-line:variable-name
  updated_at!: string;
}
