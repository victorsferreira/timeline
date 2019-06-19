import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Event } from "./app.controller";
//import * as moment from "moment";

@Injectable()
export class EventMapper {
    constructor() { }

    static collection(eventModel: Model[]){}

    static item(eventModel: Model): Event {
        const { identifier, secret, startDate, endDate, createdAt, updatedAt } = eventModel;

        return {
            identifier,
            secret: secret || null,
            startDate,
            endDate,
            createdAt,
            updatedAt
        };
    }
}
