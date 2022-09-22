import { Body, Controller, Request, Patch, Post } from '@nestjs/common';
import { IsPublic } from '../auth/authCompanies/decorators/is-public.decorator';
import { AuthRequest } from '../auth/authCompanies/models/AuthRequest';
import { CompaniesService } from './companies.service';
import { CompaniesDTO } from './dtos/companies.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @IsPublic()
  @Post('/')
  create(@Body() data: CompaniesDTO) {
    return this.companiesService.create(data);
  }

  @Patch('/update')
  async update(@Request() req: AuthRequest, @Body() data: CompaniesDTO) {
    return this.companiesService.update(req.user.id, data);
  }
}
