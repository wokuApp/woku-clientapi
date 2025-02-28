import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCompany', () => {
    it('should return company data', async () => {
      // Arrange
      const companyKey = 'test-company-key';
      const mockCompanyData = { id: 1, name: 'Test Company' };
      mockHttpService.get.mockReturnValue(of({ data: mockCompanyData }));

      // Act
      const result = await service.getCompany(companyKey);

      // Assert
      expect(httpService.get).toHaveBeenCalledWith(
        '/clientapi/get-company-data',
        {
          headers: {
            'company-key': companyKey,
          },
        },
      );
      expect(result).toEqual(mockCompanyData);
    });
  });
});
