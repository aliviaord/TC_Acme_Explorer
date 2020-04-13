import {Entity} from './entity.model';

export class Sponsorship extends Entity {

    landingPage: String;
    banner: String;
    paid: Boolean;
    sponsor: String;
    trip: String;

    constructor() {
        super();
    }
}
