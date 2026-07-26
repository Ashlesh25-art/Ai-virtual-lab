import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Judge0Service } from './judge0/judge0.service';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService, private judge0: Judge0Service) {}

  async submit(data: { sessionId: string; studentId: string; taskId: string; code: string; language: string }) {
    const token = await this.judge0.run(data.code, data.language);
    return this.prisma.submission.create({
      data: { ...data, status: 'PENDING', judge0Token: token },
    });
  }

  async findMySubmissions(studentId: string, params?: { sessionId?: string }) {
    return this.prisma.submission.findMany({
      where: { studentId, ...(params?.sessionId ? { sessionId: params.sessionId } : {}) },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.submission.findUnique({ where: { id } });
  }

  async grade(id: string, data: { score: number; feedback: string }) {
    return this.prisma.submission.update({
      where: { id },
      data: { ...data, status: 'ACCEPTED', gradedAt: new Date() },
    });
  }
}