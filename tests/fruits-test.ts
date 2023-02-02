import supertest from "supertest";
import app from "index";
import { response } from "express";

const api = supertest(app);

describe("POST /fruits", () => {
  it("Should respond with status 201 if body is correct", async () => {
    const body = {
      name: "banana",
      price: 7,
    };

    const result = await api.post("/fruits").send(body);
    expect(result.status).toBe(201);
  });

  it("Should respond with status 422 if body is incorrect", async () => {
    const body = {
      name: "banana",
    };

    const result = await api.post("/fruits").send(body);
    expect(result.status).toBe(422);
  });

  it("Should respond with status 422 if body is incorrect", async () => {
    const body = {
      price: 7,
    };

    const result = await api.post("/fruits").send(body);
    expect(result.status).toBe(422);
  });
});

describe("GET /fruits", () => {
  it("Should response with status 200 if fruits data exist", async () => {
    const result = await api.get("/fruits");
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /fruits/:id", () => {
  it("Should response with status 404 if id is invalid", async () => {
    const id = 0;
    const response = await api.get(`/fruits/${id}`);
    expect(response.status).toBe(404);
  });

  it("should response with status 200 if id is valid", async () => {
    const id = 1;
    const response = await api.get(`/fruits/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: id,
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });
});
