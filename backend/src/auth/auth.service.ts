import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const existentEmail = await this.usersService.findByEmail(
      registerDTO.email,
    );
    const existentUserName = await this.usersService.findByUserName(
      registerDTO.userName,
    );
    if (existentEmail || existentUserName) {
      throw new BadRequestException('User already exists');
    }
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    
    return await this.usersService.create({
      ...registerDTO,
      password: await bcryptjs.hash(registerDTO.password, salt),
    });
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    const payload = { email: user.email };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException('Environment variable is not defined');
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });

    return {
      token,
      email,
    };
  }
}
