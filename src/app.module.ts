import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicantsModule } from './modules/applicants/applicants.module';
import { AuthModule } from './modules/auth/authCompanies/auth.module';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    JobsModule,
    ApplicantsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
