import {Entity} from './entity.model';

export class Trip extends Entity {
    ticker: String;
    title: String;
    description: String;
    price: Number;
    requirements: String;
    startDate: Date;
    endDate:  Date;
    pictures: string[];
    publicationDate: Date;
    cancelReason: String;
    manager: String;
    
    constructor() {
        super();
    }
}
