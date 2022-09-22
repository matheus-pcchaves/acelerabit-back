import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Companies } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../../companies/companies.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Companies): UserToken {
    const payLoad: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payLoad);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.companiesService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email address or password provider does not match');
  }
}
