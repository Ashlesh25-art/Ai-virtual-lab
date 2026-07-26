import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('submissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('submissions')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post()
  submit(@Body() body: any, @Req() req: any) {
    return this.submissionService.submit({ ...body, studentId: req.user.id });
  }

  @Get('me')
  mySubmissions(@Req() req: any, @Query('sessionId') sessionId?: string) {
    return this.submissionService.findMySubmissions(req.user.id, { sessionId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionService.findById(id);
  }

  @Patch(':id/grade')
  grade(@Param('id') id: string, @Body() body: { score: number; feedback: string }) {
    return this.submissionService.grade(id, body);
  }
}