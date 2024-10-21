import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { ExampleMiddleware } from './common/middleware/example.middleware';
import { UsersModule } from './users/users.module';
import typeormConfig from './database/typeorm.config';


@Module({
  imports: [


    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),

    // TypeOrmModule.forRoot(connectionSource),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),

    CommonModule,
    SeedModule,
    AuthModule,
    UsersModule,
  ],

  controllers: [],
  providers: [],

})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .exclude('seed/create-user-admin')
      .forRoutes('contacts', 'users', 'auth', 'seed')
  }

  constructor() {
    console.log({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
  }
}
