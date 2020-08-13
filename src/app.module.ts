import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityManager } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware} from './middleware/auth.middleware';
import { ContentModule } from './content/content.module';
import { CorsMiddleware } from './middleware/cors.middleware';


@Module({
  imports: [TypeOrmModule.forRoot({loggerLevel: "info"}), AuthModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(LoggerMiddleware).exclude('/auth/login').forRoutes('*');
  }
}
