import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
    private readonly visual_crossing_api_key: string;
    
    constructor(private configService: ConfigService){
        this.visual_crossing_api_key = this.configService.get<string>('VISUAL_CROSSING_API_KEY');
    }
    
    async findByLocation(location: string) {
        return `you entered ${location}`;
    }
}
