import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  exports: [
    SeedService
  ]
})
export class SeedModule { }
