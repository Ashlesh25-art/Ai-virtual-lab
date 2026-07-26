import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Judge0Service } from './judge0/judge0.service';
import { Judge0Client } from './judge0/judge0.client';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService, Judge0Service, Judge0Client],
  exports: [SubmissionService],
})
export class SubmissionModule {}