import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { isUUID } from 'class-validator';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.findByTerm(createUserDto.userName);

      if (user) throw new BadRequestException('El usuario ya existe');

      // Hashing password
      const hashedPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;

      const newUser = this.usersRepository.create({
        ...createUserDto,
      });
      await this.usersRepository.save(newUser);

      return 'Usuario registrado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find({
        where: { status: 'A' },
        loadEagerRelations: false
      })
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    try {

      const user = await this.findByTerm(term);

      if (!user) throw new NotFoundException('Usuario no encontrado')
      return user;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const propFilter = isUUID(id) ? 'id' : 'userName';

    try {

      await this.findOne(id);

      if (updateUserDto.password)
        updateUserDto.password = await hash(updateUserDto.password, 10);

      await this.usersRepository.update({ [propFilter]: id }, updateUserDto);

      return 'Usuario actualizado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);

      await this.usersRepository.update({ id: user.id }, { status: 'I' });

      return 'Usuario eliminado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }


  async findByTerm(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'userName';
    try {

      const user = await this.usersRepository.findOne({
        where: { [propFilter]: term.toLowerCase(), status: 'A' }
      })

      if (!user) return null;

      return user

    } catch (error) {
      throw error;
    }
  }
}
