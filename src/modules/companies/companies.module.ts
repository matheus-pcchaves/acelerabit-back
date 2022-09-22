import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtAuthGuard } from '../auth/authCompanies/guards/jwt-auth.guard';

@Module({
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
