import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

interface Event{}

@Injectable()
export class EventProvider {
  constructor(@InjectModel('Event') private readonly eventModel) {}

  delete(criteria): Promise<any> {
    return this.eventModel.deleteMany(criteria);
  }

  create(data): Promise<any> {
    return this.eventModel.create(data);
  }

  find(key, value): Promise<any> {
    const criteria = {};
    criteria[key] = value;
    return this.eventModel.findOne(criteria);
  }
}
