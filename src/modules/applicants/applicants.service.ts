import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ApplicantsDTO } from './dtos/applicants.dto';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  async create({
    jobId,
    userId,
    name,
    skills,
    experience,
    curriculum,
  }: ApplicantsDTO) {
    const application = await this.prisma.applicants.create({
      data: {
        jobId,
        userId,
        name,
        skills,
        experience,
        curriculum,
      },
    });
    return application;
  }

  async findByUser(userId: string) {
    const user = await this.prisma.applicants.findMany({
      where: {
        userId,
      },
    });

    return user;
  }

  async findApplicantsByJob(jobId: string) {
    const jobs = await this.prisma.applicants.findMany({
      where: {
        jobId,
      },
    });
    return jobs;
  }

  async selectApplicants(id: string, data: ApplicantsDTO) {
    const applicants = await this.prisma.applicants.update({
      where: {
        id,
      },
      data: {
        approved: data.approved,
      },
    });

    return applicants;
  }
}
