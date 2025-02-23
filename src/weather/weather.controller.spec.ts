import { Test, TestingModule } from "@nestjs/testing";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { ConfigService } from "@nestjs/config";

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

  describe("findByLocation", () => {
    it("should call weatherService.findByLocation with correct parameter", async () => {
      const location = "London";
      const expectedResult = `you entered ${location}`;

      jest.spyOn(weatherService, "findByLocation").mockResolvedValue(expectedResult);

      const result = await controller.findByLocation(location);

      expect(weatherService.findByLocation).toHaveBeenCalledWith(location);
      expect(result).toBe(expectedResult);
    });
  });
});
