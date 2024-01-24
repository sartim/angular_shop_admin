import {NgIterable} from '@angular/core';
import {User} from './user';
import {Status} from './status';

export class Order {
    next!: string;
    previous!: string;
    count!: number;
    results!: NgIterable<any>;
    // tslint:disable-next-line:variable-name
    created_at!: string;
    // tslint:disable-next-line:variable-name
    updated_at!: string;
}

export class OrderDetail {
    id!: number;
    user!: User;
    status!: Status;
    // tslint:disable-next-line:variable-name
    order_total!: number;
    // tslint:disable-next-line:variable-name
    created_at!: string;
    // tslint:disable-next-line:variable-name
    updated_at!: string;
}

