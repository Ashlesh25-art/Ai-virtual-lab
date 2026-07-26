import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class Judge0Client {
  private readonly baseUrl: string;
  private readonly authToken: string;

  constructor(private config: ConfigService) {
    this.baseUrl = config.get('JUDGE0_URL', 'http://localhost:2358');
    this.authToken = config.get('JUDGE0_AUTH_TOKEN', '');
  }

  private get headers() {
    return this.authToken ? { 'X-Auth-Token': this.authToken } : {};
  }

  async createSubmission(data: { source_code: string; language_id: number; stdin?: string }) {
    const res = await axios.post(`${this.baseUrl}/submissions?base64_encoded=false&wait=false`, data, {
      headers: this.headers,
    });
    return res.data;
  }

  async getSubmission(token: string) {
    const res = await axios.get(`${this.baseUrl}/submissions/${token}?base64_encoded=false`, {
      headers: this.headers,
    });
    return res.data;
  }
}