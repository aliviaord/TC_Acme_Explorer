import {Entity} from './entity.model';

export class TripApplication extends Entity {
    moment: Date;
    status: String;
    comments: String;
    paidDate: Date;
    rejectedReason: String;
    trip: String;
    explorer: String;
    manager: String;

    constructor() {
        super();
    }
}
