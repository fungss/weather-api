import { Test, TestingModule } from "@nestjs/testing";
import { WeatherService } from "./weather.service";
import { ConfigService } from "@nestjs/config";
import { BadGatewayException } from "@nestjs/common";
import axios from "axios";

jest.mock("axios"); // Mocks the entire axios module
const mockedAxios = axios as jest.Mocked<typeof axios>; // Type assertion

describe.skip("WeatherService", () => {
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

  describe.skip("findByLocation", () => {
    it("should handle invalid response from Weather API", async () => {
      const mockApiResponse = { resolvedAddress: "London, England, United Kingdom" };
      mockedAxios.get.mockResolvedValue(mockApiResponse);
      expect(await service.findByLocation("London")).rejects.toThrow(BadGatewayException);
    });
  });
});
