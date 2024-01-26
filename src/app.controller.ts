import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('client api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'Service available',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          example: 'woku client api ⭐️💬',
        },
      },
    },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
