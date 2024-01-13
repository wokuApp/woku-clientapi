import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { WokusService } from './wokus.service';
import { WokusController } from './wokus.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('API'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [WokusController],
  providers: [WokusService],
})
export class WokusModule {}
