import {NgIterable} from '@angular/core';
import {User} from './user';

export class Order {
    date!: string;
    value!: number;
    count!: number;
    results!: NgIterable<any>;
}

export class OrderDetail {
    id!: number;
    user!: User;
}

