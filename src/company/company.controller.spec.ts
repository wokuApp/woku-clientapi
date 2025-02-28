import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Request } from 'express';

describe('CompanyController', () => {
  let controller: CompanyController;
  let companyService: CompanyService;

  const mockCompanyService = {
    getCompany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCompany', () => {
    it('should return company data', async () => {
      // Arrange
      const mockRequest = {
        headers: {
          authorization: 'test-company-key',
        },
      } as Request;
      const mockCompanyData = { id: 1, name: 'Test Company' };
      mockCompanyService.getCompany.mockResolvedValue(mockCompanyData);

      // Act
      const result = await controller.getCompany(mockRequest);

      // Assert
      expect(companyService.getCompany).toHaveBeenCalledWith(
        'test-company-key',
      );
      expect(result).toEqual(mockCompanyData);
    });
  });
});
