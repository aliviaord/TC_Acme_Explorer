import {Entity} from './entity.model';

export class Dashboard extends Entity {

    avgMinMaxStdTripsPerManager: Number[] = [];
    avgMinMaxStdApplicationsPerTrip: Number[] = [];
    avgMinMaxStdTripsPrice: Number[] = [];
    ratioApplicationsByStatus: Number[] = [];
    avgPriceRangeFinders: Number[] = [];
    topFinderKeywords: String[] = [];

    constructor() {
        super();
    }
}
