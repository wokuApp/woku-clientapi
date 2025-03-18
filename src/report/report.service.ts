import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(private readonly httpService: HttpService) {}

  async getNpsToolReport(npsToolId: string, authHeader: string) {
    const npsToolReport$ = this.httpService.post(
      '/reports/clientapi/nps-tool',
      {
        npsToolId,
        authHeader,
      },
    );

    const npsToolReport = await firstValueFrom(npsToolReport$);

    return npsToolReport.data;
  }

  async getCompanyNpsReport(authHeader: string) {
    const companyNpsReport$ = this.httpService.post(
      '/reports/clientapi/company-nps',
      {
        authHeader,
      },
    );

    const companyNpsReport = await firstValueFrom(companyNpsReport$);

    return companyNpsReport.data;
  }
}
