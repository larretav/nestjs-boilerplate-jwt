import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiSignIn } from './swagger/sign-in/sign-in.swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('login')
  @ApiSignIn()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

}
