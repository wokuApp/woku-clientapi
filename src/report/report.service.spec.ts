import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ReportService } from './report.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('ReportService', () => {
  let service: ReportService;
  let httpService: HttpService;

  beforeEach(async () => {
    const httpServiceMock = {
      post: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNpsToolReport', () => {
    it('should return NPS tool report data', async () => {
      // Arrange
      const mockResponse = {
        data: {
          _id: '123',
          name: 'Test NPS Tool',
          score: 85,
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: 'OK',
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of(mockResponse as AxiosResponse));

      const npsToolId = 'test-nps-tool-id';
      const authHeader = 'Bearer token123';

      // Act
      const result = await service.getNpsToolReport(npsToolId, authHeader);

      // Assert
      expect(httpService.post).toHaveBeenCalledWith(
        '/reports/clientapi/nps-tool',
        {
          npsToolId,
          authHeader,
        },
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getCompanyNpsReport', () => {
    it('should return company NPS report data', async () => {
      // Arrange
      const mockResponse = {
        data: {
          _id: 'comp-123',
          overallScore: 75,
          departmentScores: [
            { department: 'Sales', score: 80 },
            { department: 'Support', score: 70 },
          ],
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: 'OK',
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of(mockResponse as AxiosResponse));

      const authHeader = 'Bearer token123';

      // Act
      const result = await service.getCompanyNpsReport(authHeader);

      // Assert
      expect(httpService.post).toHaveBeenCalledWith(
        '/reports/clientapi/company-nps',
        {
          authHeader,
        },
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
