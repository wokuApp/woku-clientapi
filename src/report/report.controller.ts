import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { ReportService } from './report.service';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiBearerAuth()
  @Get('/nps-tool/:npsToolId')
  @ApiParam({
    name: 'npsToolId',
    required: true,
    description: 'NPS Tool ID',
    type: String,
    example: 'abc123',
  })
  async getNpsToolReport(@Param('npsToolId') id: string, @Req() req: Request) {
    return await this.reportService.getNpsToolReport(
      id,
      req.headers.authorization,
    );
  }

  @ApiBearerAuth()
  @Get('/company-nps')
  async getCompanyNpsReport(@Req() req: Request) {
    return await this.reportService.getCompanyNpsReport(
      req.headers.authorization,
    );
  }
}
