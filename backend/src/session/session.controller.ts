import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.sessionService.findAll({ status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findById(id);
  }

  @Post()
  create(@Body() body: { experimentId: string; sectionId: string; scheduledAt: string }) {
    return this.sessionService.create(body);
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.sessionService.start(id);
  }

  @Post(':id/end')
  end(@Param('id') id: string) {
    return this.sessionService.end(id);
  }
}