import { Controller, Get, Post, HttpCode, Body, Param, Request, UsePipes, UseFilters } from '@nestjs/common';
import { EventService } from './app.service';
import * as moment from "moment";
import { ParamConverterPipe } from './app.param.converter';
import { ParamValidatorPipe } from './app.param.validator';
import { ErrorFilter } from './app.error.filter';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface Event {
  identifier: string;
  secret?: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export interface CreateEventRequest extends Omit<Event, "createdAt" | "updatedAt"> { }

interface StandardResponse<T> {
  data: T;
}

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) { }
  
  @HttpCode(201)
  @Post()
  @UsePipes(ParamValidatorPipe, ParamConverterPipe)
  async create(
    @Body() data: CreateEventRequest
  ): Promise<StandardResponse<Event>> {
    const result = await this.eventService.create(data);

    return {
      data: result
    };
  }

  @HttpCode(200)
  @Get(":identifier")
  @UseFilters(ErrorFilter)
  async show(
    @Param("identifier") identifier
  ): Promise<any> {
    const result = await this.eventService.getByIdentifier(identifier);

    return {
      data: result
    };
  }
}
