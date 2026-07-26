import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('hint')
  getHint(@Body() body: { code: string; taskDescription: string; hintLevel: number }) {
    return this.aiService.getHint(body.code, body.taskDescription, body.hintLevel);
  }

  @Post('explain-error')
  explainError(@Body() body: { code: string; error: string }) {
    return this.aiService.explainError(body.code, body.error);
  }

  @Post('viva/generate')
  generateViva(@Body() body: { experimentId: string; studentId: string }) {
    return this.aiService.generateVivaQuestions(body.experimentId, body.studentId);
  }
}