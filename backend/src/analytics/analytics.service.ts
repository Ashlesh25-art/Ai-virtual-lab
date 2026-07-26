import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getPlatformStats() {
    const [totalStudents, totalInstructors, activeSessions, submissionsToday] = await Promise.all([
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'INSTRUCTOR' } }),
      this.prisma.session.count({ where: { status: 'ACTIVE' } }),
      this.prisma.submission.count({
        where: { submittedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      }),
    ]);
    return { totalStudents, totalInstructors, activeSessions, submissionsToday };
  }
}