import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(private readonly httpService: HttpService) {}

  async getCompany(companyKey: string) {
    const companyData$ = this.httpService.get(`/clientapi/get-company-data`, {
      headers: {
        'company-key': companyKey,
      },
    });

    const companyData = await firstValueFrom(companyData$);

    return companyData.data;
  }
}
