import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CompaniesDTO } from './dtos/companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const company = await this.prisma.companies.findFirst({
      where: {
        email: email,
      },
    });

    return company;
  }

  async create(data: CompaniesDTO) {
    const companyExists = await this.findByEmail(data.email);

    if (companyExists) {
      throw new Error('company already exists');
    }

    const company = await this.prisma.companies.create({
      data,
    });

    return company;
  }

  async update(id: string, data: CompaniesDTO) {
    const company = await this.prisma.companies.update({
      where: {
        id,
      },
      data,
    });

    return company;
  }
}
