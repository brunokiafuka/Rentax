import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'test_admin', 'admin@rentex.com', '${password}', 'true', 'now()', 'XXXXXXX')
      `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      password: "admin",
      email: "admin@rentex.com",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test",
        description: "Test Category",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should not be able to create a new category with existing name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      password: "admin",
      email: "admin@rentex.com",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test",
        description: "Test Category",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(400);
  });
});
