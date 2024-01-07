import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WokusService } from './wokus.service';
import { WokusController } from './wokus.controller';
import { api } from './constants';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: api,
      }),
    }),
  ],
  controllers: [WokusController],
  providers: [WokusService],
})
export class WokusModule {}
