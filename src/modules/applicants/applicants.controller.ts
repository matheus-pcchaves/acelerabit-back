import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { IsPublic } from '../auth/authCompanies/decorators/is-public.decorator';
import { ApplicantsService } from './applicants.service';
import { ApplicantsDTO } from './dtos/applicants.dto';

@Controller('applicants')
export class ApplicantsController {
  user: Users;
  constructor(private readonly applicantsService: ApplicantsService) {}

  @IsPublic()
  @Post('/:id')
  create(
    @Param('id')
    userId,
    @Body()
    { jobId, name, skills, experience, curriculum }: ApplicantsDTO,
  ) {
    return this.applicantsService.create({
      userId,
      jobId,
      name,
      skills,
      experience,
      curriculum,
    });
  }

  @IsPublic()
  @Get('/:id')
  findByUser(@Param('id') userId: string) {
    return this.applicantsService.findByUser(userId);
  }

  @Get('/byJob/:id')
  findApplicantsByJob(@Param('id') jobId: string) {
    return this.applicantsService.findApplicantsByJob(jobId);
  }

  @Patch('/:id')
  selectApplicants(@Param('id') id: string, @Body() data: ApplicantsDTO) {
    return this.applicantsService.selectApplicants(id, data);
  }
}
