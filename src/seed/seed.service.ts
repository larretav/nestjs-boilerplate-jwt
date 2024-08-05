import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { usersDataTest } from './data/users-data';
import { AdminCredentials } from './interfaces/admin-cred.interface';

@Injectable()
export class SeedService {

  constructor(

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,

  ) { }



  async runSeed() {

    try {
      this.usersRepository.delete({});

      await this.intertUsers();

      return 'Seed excecuted';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }


  private async intertUsers() {
    try {
      const userPromises = usersDataTest.map(user => {
        return this.usersService.create(user)
      });

      await Promise.all(userPromises)
    } catch (error) {
      throw error;
    }
  }



  async createAdminUser(credentials: AdminCredentials) {
    const { userName, password } = credentials;

    if (userName !== 'larretav' || password !== '123Tamarindo')
      throw new UnauthorizedException('Usuario no autorizado');

    try {
      await this.usersService.create({
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        userName: "admin",
        password: "123Tamarindo",
        role: "admin",
      })

      return 'Usuario Admin creado'
    } catch (error) {
      throw error;
    }
  }
}
