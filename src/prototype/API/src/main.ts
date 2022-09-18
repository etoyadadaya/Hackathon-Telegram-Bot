import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "./pipes/validation.pipe";

NestFactory.create(AppModule, {logger: ["verbose", "error", "log", "warn", "debug"]}).then((app) => {
  app.setGlobalPrefix("/api/v1");
  app.useGlobalPipes(new ValidationPipe())
  app.listen(3000);
});
