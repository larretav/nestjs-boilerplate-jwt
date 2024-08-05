import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { Role } from '../enums/role.enum';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }


  async validate(payload: any): Promise<JwtUser> {

    const { user, name, role } = payload;

    // if (role !== Role.Admin) throw new UnauthorizedException();

    const userDb = await this.usersService.findOne(user);


    return { user, name, role, userId: userDb.id };
  }
}