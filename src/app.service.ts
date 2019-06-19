import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventProvider } from "./app.provider";
import { CreateEventRequest } from "./app.controller";
import { EventMapper } from "./app.mapper"
import moment = require('moment');

@Injectable()
export class EventService {
  constructor(private readonly eventProvider: EventProvider) { }

  deleteOld = () => {
    const lastWeekDate = new Date(moment().subtract(7, 'd').valueOf());
    const criteria = {
      endDate: { $lt: lastWeekDate }
    };

    return this.eventProvider.delete(criteria);
  }

  async create(createEventRequest: CreateEventRequest): Promise<any> {
    const { identifier, secret, startDate, endDate } = createEventRequest;

    const data = {
      identifier,
      secret,
      startDate: moment(startDate).format(),
      endDate: moment(endDate).format(),
      updatedAt: Date.now(),
      createdAt: Date.now()
    };

    try {
      const event = await this.eventProvider.create(data);
      return EventMapper.item(event);
    } catch (e) {
      console.log("Couldn't create event", e);
      throw new HttpException("BadRequest", HttpStatus.BAD_REQUEST);
    }    
  }

  async getByIdentifier(identifier: any) {
    const event = await this.eventProvider.find("identifier", identifier);
    if (event) {
      return EventMapper.item(event);
    }

    return null;
  }
}
