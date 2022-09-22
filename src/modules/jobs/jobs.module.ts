import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtAuthGuard } from '../auth/authCompanies/guards/jwt-auth.guard';

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class JobsModule {}
