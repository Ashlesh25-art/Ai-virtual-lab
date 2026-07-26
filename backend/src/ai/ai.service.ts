import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AIService {
  constructor(private config: ConfigService) {}

  async getHint(code: string, taskDescription: string, hintLevel: number) {
    const url = this.config.get('HINT_SERVICE_URL');
    const { data } = await axios.post(`${url}/hint`, { code, taskDescription, hintLevel });
    return data;
  }

  async explainError(code: string, error: string) {
    const url = this.config.get('ERROR_EXPLANATION_SERVICE_URL');
    const { data } = await axios.post(`${url}/explain`, { code, error });
    return data;
  }

  async generateVivaQuestions(experimentId: string, studentId: string) {
    const url = this.config.get('VIVA_SERVICE_URL');
    const { data } = await axios.post(`${url}/generate`, { experimentId, studentId });
    return data;
  }
}