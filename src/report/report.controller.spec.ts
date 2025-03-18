import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Request } from 'express';

describe('ReportController', () => {
  let controller: ReportController;
  let reportService: ReportService;

  beforeEach(async () => {
    const reportServiceMock = {
      getNpsToolReport: jest.fn(),
      getCompanyNpsReport: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: reportServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ReportController>(ReportController);
    reportService = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNpsToolReport', () => {
    it('should return NPS tool report data', async () => {
      // Arrange
      const mockNpsToolId = 'test-nps-tool-id';
      const mockAuthHeader = 'Bearer token123';
      const mockRequest = {
        headers: {
          authorization: mockAuthHeader,
        },
      } as Request;

      const mockReportData = {
        id: mockNpsToolId,
        name: 'Test NPS Tool',
        score: 85,
      };

      jest
        .spyOn(reportService, 'getNpsToolReport')
        .mockResolvedValue(mockReportData);

      // Act
      const result = await controller.getNpsToolReport(
        mockNpsToolId,
        mockRequest,
      );

      // Assert
      expect(reportService.getNpsToolReport).toHaveBeenCalledWith(
        mockNpsToolId,
        mockAuthHeader,
      );
      expect(result).toEqual(mockReportData);
    });
  });

  describe('getCompanyNpsReport', () => {
    it('should return company NPS report data', async () => {
      // Arrange
      const mockAuthHeader = 'Bearer token123';
      const mockRequest = {
        headers: {
          authorization: mockAuthHeader,
        },
      } as Request;

      const mockReportData = {
        companyId: 'comp-123',
        overallScore: 75,
        departmentScores: [
          { department: 'Sales', score: 80 },
          { department: 'Support', score: 70 },
        ],
      };

      jest
        .spyOn(reportService, 'getCompanyNpsReport')
        .mockResolvedValue(mockReportData);

      // Act
      const result = await controller.getCompanyNpsReport(mockRequest);

      // Assert
      expect(reportService.getCompanyNpsReport).toHaveBeenCalledWith(
        mockAuthHeader,
      );
      expect(result).toEqual(mockReportData);
    });
  });
});
