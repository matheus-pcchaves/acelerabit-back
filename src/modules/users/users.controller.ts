import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dtos/users.dto';
import { IsPublic } from '../auth/authCompanies/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post('/')
  create(@Body() data: UsersDTO) {
    return this.usersService.create(data);
  }
}
