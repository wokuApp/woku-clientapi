import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';

import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/nps-tool/:npsToolId')
  async getNpsToolReport(@Param('npsToolId') id: string, @Req() req: Request) {
    return await this.reportService.getNpsToolReport(
      id,
      req.headers.authorization,
    );
  }

  @Get('/company-nps')
  async getCompanyNpsReport(@Req() req: Request) {
    return await this.reportService.getCompanyNpsReport(
      req.headers.authorization,
    );
  }
}
