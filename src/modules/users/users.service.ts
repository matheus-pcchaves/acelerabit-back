import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersDTO } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const userEmail = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    return userEmail;
  }

  async create(userDTO: UsersDTO) {
    const userExists = await this.findByEmail(userDTO.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const data = {
      ...userDTO,
      password: await bcrypt.hash(userDTO.password, 8),
    };

    const user = await this.prisma.users.create({
      data,
    });

    return user;
  }
}
