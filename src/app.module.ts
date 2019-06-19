import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { EventController } from './app.controller';
import { EventService } from './app.service';
import { EventSchema } from "./app.schema";
import { EventProvider } from "./app.provider";
import { ErrorFilter } from "./app.error.filter";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://mongo/timeline"),
    MongooseModule.forFeature([{ name: "Event", schema: EventSchema }])
  ],
  controllers: [EventController],
  providers: [EventService, EventProvider, ErrorFilter],
})
export class AppModule { }
