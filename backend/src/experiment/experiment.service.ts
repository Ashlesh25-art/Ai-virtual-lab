import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperimentService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { subjectId?: string }) {
    return this.prisma.experiment.findMany({
      where: params?.subjectId ? { subjectId: params.subjectId } : undefined,
      include: { subject: true, _count: { select: { tasks: true, sessions: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const exp = await this.prisma.experiment.findUnique({
      where: { id },
      include: { subject: true, tasks: { include: { testCases: true }, orderBy: { order: 'asc' } }, content: true },
    });
    if (!exp) throw new NotFoundException('Experiment not found');
    return exp;
  }

  async create(data: any) {
    return this.prisma.experiment.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.experiment.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.experiment.delete({ where: { id } });
  }
}