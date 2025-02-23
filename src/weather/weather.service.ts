import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WeatherService {
  private readonly visualCrossingApiKey: string;
  constructor(private configService: ConfigService) {
    this.visualCrossingApiKey = this.configService.get<string>("VISUAL_CROSSING_API_KEY");
  }
  async findByLocation(location: string) {
    return { message: `you entered ${location}` };
  }
}
