import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AcademicModule } from './academic/academic.module';
import { ExperimentModule } from './experiment/experiment.module';
import { ContentModule } from './content/content.module';
import { SessionModule } from './session/session.module';
import { SubmissionModule } from './submission/submission.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationModule } from './notification/notification.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CertificateModule } from './certificate/certificate.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { AIModule } from './ai/ai.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    AcademicModule,
    ExperimentModule,
    ContentModule,
    SessionModule,
    SubmissionModule,
    AttendanceModule,
    NotificationModule,
    AnalyticsModule,
    CertificateModule,
    KnowledgeModule,
    AIModule,
    ReportModule,
  ],
})
export class AppModule {}
