import { Test, TestingModule } from '@nestjs/testing';
import { WokusService } from './wokus.service';

describe('WokusService', () => {
  let service: WokusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WokusService],
    }).compile();

    service = module.get<WokusService>(WokusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
