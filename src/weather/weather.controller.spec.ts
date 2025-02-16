import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe("WeatherController", () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        WeatherService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("mock-api-key")
          }
        }
      ]
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe('findByLocation', () => {
    it('should call weatherService.findByLocation with correct parameter', async () => {
      const location = 'London';
      const expectedResult = {
        'message': 'pang testing' 
      };

      jest.spyOn(weatherService, "findByLocation").mockResolvedValue(expectedResult);

      // test if controller calling correct service
      expect(await controller.findByLocation(location)).toBe(expectedResult);
      // test if correct param submitted
      expect(await weatherService.findByLocation).toHaveBeenCalledWith(location);
    });

    it('should throw BadRequestException for invalid location', async () => {
      expect(await controller.findByLocation(null)).toThrow(BadRequestException);
      expect(await controller.findByLocation('')).toThrow(BadRequestException);
    });
  });
});
