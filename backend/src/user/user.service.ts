import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { role?: string; page?: number; limit?: number }) {
    const { role, page = 1, limit = 20 } = params || {};
    return this.prisma.user.findMany({
      where: role ? { role: role as any } : undefined,
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; name: string; password: string; role: any }) {
    const passwordHash = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data: { email: data.email, name: data.name, passwordHash, role: data.role },
      select: { id: true, email: true, name: true, role: true },
    });
  }

  async update(id: string, data: Partial<{ name: string; isActive: boolean }>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}