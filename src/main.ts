import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DB } from './db';
import { TaskManager } from "./task-manager";
import { EventService } from "./app.service";
import { EventProvider } from "./app.provider";
import { config } from "../config";
// import { ErrorFilter } from "./app.error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await DB.connect();
  await app.listen(config.port);

  // app.useGlobalFilters(new ErrorFilter());
  
  // const service = new EventService(new EventProvider());
  
  // (new TaskManager("Database Cleaner"))
  // .setInterval(1000 * 60 * 60)
  // .start(service.deleteOld);
}

bootstrap();
