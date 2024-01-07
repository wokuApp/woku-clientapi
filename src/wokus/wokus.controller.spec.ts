import { Test, TestingModule } from '@nestjs/testing';
import { WokusController } from './wokus.controller';
import { WokusService } from './wokus.service';

describe('WokusController', () => {
  let controller: WokusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WokusController],
      providers: [WokusService],
    }).compile();

    controller = module.get<WokusController>(WokusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
