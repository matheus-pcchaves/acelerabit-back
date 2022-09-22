import {
  Body,
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsDTO } from './dtos/jobs.dto';
import { AuthRequest } from '../auth/authCompanies/models/AuthRequest';
import { IsPublic } from '../auth/authCompanies/decorators/is-public.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('/create')
  create(
    @Request() req: AuthRequest,
    @Body()
    {
      companyName,
      serviceName,
      description,
      main_skill,
      other_skills,
      salary,
      end_date,
    }: JobsDTO,
  ) {
    return this.jobsService.create({
      companyId: req.user.id,
      companyName,
      serviceName,
      description,
      main_skill,
      other_skills,
      salary,
      end_date,
    });
  }

  @IsPublic()
  @Get('/')
  findAll() {
    return this.jobsService.findAll();
  }

  @IsPublic()
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('/company/:id')
  findJobsByCompany(@Param('id') id: string) {
    return this.jobsService.findJobsByCompany(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() data: JobsDTO) {
    return this.jobsService.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id') jobId: string) {
    return this.jobsService.remove(jobId);
  }
}
