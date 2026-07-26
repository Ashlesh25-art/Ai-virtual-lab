import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { status?: string }) {
    return this.prisma.session.findMany({
      where: params?.status ? { status: params.status as any } : undefined,
      include: { experiment: true, section: true },
      orderBy: { scheduledAt: 'desc' },
    });
  }

  async findById(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { experiment: { include: { tasks: true } }, section: true },
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async create(data: { experimentId: string; sectionId: string; scheduledAt: string }) {
    return this.prisma.session.create({ data: { ...data, scheduledAt: new Date(data.scheduledAt) } });
  }

  async start(id: string) {
    return this.prisma.session.update({ where: { id }, data: { status: 'ACTIVE', startedAt: new Date() } });
  }

  async end(id: string) {
    return this.prisma.session.update({ where: { id }, data: { status: 'COMPLETED', endedAt: new Date() } });
  }
}