import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WokusModule } from './wokus/wokus.module';

@Module({
  imports: [WokusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
