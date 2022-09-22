import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtAuthGuard } from '../auth/authCompanies/guards/jwt-auth.guard';

@Module({
  controllers: [ApplicantsController],
  providers: [
    ApplicantsService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApplicantsModule {}
