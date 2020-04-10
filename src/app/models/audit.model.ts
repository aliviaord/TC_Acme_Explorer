import { Entity } from "./entity.model";

export class Audit extends Entity{
    title: String;
    description: String;
    attachments: String[];
    trip: String;
    auditor: String;
    createdAt: Date;
}
