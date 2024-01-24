import {NgIterable} from '@angular/core';

export class Status {
    next!: string;
    previous!: string;
    count!: number;
    results!: NgIterable<any>;
    // tslint:disable-next-line:variable-name
    created_at!: string;
    // tslint:disable-next-line:variable-name
    updated_at!: string;
}

export class StatusDetail {
    id!: number;
    name!: string;
    description!: string;
    results!: NgIterable<any>;
    // tslint:disable-next-line:variable-name
    created_at!: string;
    // tslint:disable-next-line:variable-name
    updated_at!: string;
}

