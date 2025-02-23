import { Test, TestingModule } from "@nestjs/testing";
import { WeatherService } from "./weather.service";
import { ConfigService } from "@nestjs/config";

describe("WeatherService", () => {
  let service: WeatherService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<WeatherService>(WeatherService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should initialize with API key from config service", () => {
    expect(configService.get).toHaveBeenCalledWith("VISUAL_CROSSING_API_KEY");
  });

  describe("findByLocation", () => {
    it("should return location string", async () => {
      const location = "New York";
      const result = await service.findByLocation(location);
      expect(result).toBe(`you entered ${location}`);
    });
  });
});
