import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "./../src/app.module";
import { INestApplication } from "@nestjs/common";

describe.skip("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Hello World!");
  });

  describe.skip("/weather", () => {
    it("should return weather data for a given location", () => {
      const location = "London";
      return request(app.getHttpServer())
        .get("/weather")
        .query({ location })
        .expect(200)
        .expect((res) => {
          expect(res.text).toBe(`you entered ${location}`);
        });
    });

    // TODO: currently returns 200, should return 400
    it("should handle missing location parameter", () => {
      return request(app.getHttpServer())
        .get("/weather")
        .expect(200)
        .expect((res) => {
          expect(res.text).toBe(`you entered undefined`);
        });
    });
  });
});
