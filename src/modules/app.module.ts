import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import defConfig from '../defaultConfig';
import { AppController } from 'src/controllers/app.controller';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { AuthGuard } from 'src/auth.guard';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    load: [defConfig],
    cache: false,
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ({
        type: configService.get<string>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        retryAttempts: 3,
        synchronize: false,
      }) as TypeOrmModuleOptions,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'public'),
  }),],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AppModule {}
