import {Entity} from './entity.model';

export class Actor extends Entity {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    banned: string;
    role: string;

    constructor() {
        super();
    }
}
