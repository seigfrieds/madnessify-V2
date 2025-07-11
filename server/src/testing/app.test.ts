import request from "supertest";
import app from "#app.js";

describe("GET /", () => {
    it("returns 200", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
    });
});
