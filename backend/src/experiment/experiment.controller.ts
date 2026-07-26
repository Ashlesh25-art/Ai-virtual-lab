import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('experiments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('experiments')
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get()
  findAll(@Query('subjectId') subjectId?: string) {
    return this.experimentService.findAll({ subjectId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experimentService.findById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.experimentService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.experimentService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experimentService.delete(id);
  }
}