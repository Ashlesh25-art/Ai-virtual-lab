import { Injectable } from '@nestjs/common';
import { Judge0Client } from './judge0.client';

const LANGUAGE_MAP: Record<string, number> = {
  python: 71,
  javascript: 63,
  typescript: 74,
  java: 62,
  cpp: 54,
  c: 50,
};

@Injectable()
export class Judge0Service {
  constructor(private judge0Client: Judge0Client) {}

  async run(code: string, language: string, stdin?: string) {
    const languageId = LANGUAGE_MAP[language.toLowerCase()] || 71;
    const submission = await this.judge0Client.createSubmission({
      source_code: code,
      language_id: languageId,
      stdin,
    });
    return submission.token;
  }

  async getResult(token: string) {
    return this.judge0Client.getSubmission(token);
  }
}