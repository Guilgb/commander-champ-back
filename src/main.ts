import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  app.use('/health', (req, res) => res.json({ status: 'ok' }));
  
  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}
bootstrap();
