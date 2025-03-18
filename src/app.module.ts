import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WokusModule } from './wokus/wokus.module';
import { ReviewModule } from './review/review.module';
import { CompanyModule } from './company/company.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WokusModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ReviewModule,
    CompanyModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
