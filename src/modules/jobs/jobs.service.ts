import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { JobsDTO } from './dtos/jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create({
    companyId,
    companyName,
    serviceName,
    description,
    main_skill,
    other_skills,
    salary,
    end_date,
  }: JobsDTO) {
    const job = await this.prisma.jobs.create({
      data: {
        companyId,
        companyName,
        serviceName,
        description,
        main_skill,
        other_skills,
        salary,
        end_date,
      },
    });

    return job;
  }

  async findAll() {
    const jobs = await this.prisma.jobs.findMany({
      orderBy: { created_at: 'desc' },
    });

    return jobs;
  }

  async findOne(id: string) {
    const jobs = await this.prisma.jobs.findFirst({
      where: {
        id,
      },
      select: {
        serviceName: true,
        description: true,
        main_skill: true,
        other_skills: true,
        salary: true,
      },
      orderBy: { end_date: 'desc' },
    });

    return jobs;
  }

  async findJobsByCompany(companyId: string) {
    const job = await this.prisma.jobs.findMany({
      select: {
        id: true,
        companyId: true,
        serviceName: true,
        description: true,
        main_skill: true,
        other_skills: true,
        salary: true,
        end_date: true,
      },
      where: {
        companyId,
      },
    });

    return job;
  }

  async update(id: string, data: JobsDTO) {
    const job = await this.prisma.jobs.update({
      where: {
        id,
      },
      data: {
        companyId: data.companyId,
        serviceName: data.serviceName,
        description: data.description,
        main_skill: data.main_skill,
        other_skills: data.other_skills,
        salary: data.salary,
        end_date: data.end_date,
      },
    });

    return job;
  }

  async remove(id: string) {
    const job = await this.prisma.jobs.delete({
      where: {
        id,
      },
    });

    return job;
  }
}
