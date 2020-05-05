import {Entity} from './entity.model';

export class Finder extends Entity {
    keyword: String;
    minPrice: Number;
    maxPrice: Number;
    startDate: Date;
    endDate: Date;
    explorer: String;

    constructor() {
        super();
    }
}
