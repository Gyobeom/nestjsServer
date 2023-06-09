import { NestFactory } from '@nestjs/core';
declare const module: any;
import { NestExpressApplication } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
