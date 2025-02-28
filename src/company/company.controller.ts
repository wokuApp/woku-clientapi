import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @Get()
  getCompany(@Req() req: Request) {
    return this.companyService.getCompany(req.headers.authorization);
  }
}
