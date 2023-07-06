const request = require("supertest");
const app = require("../../index");
// We use describe("",()=>{}) to group a group tests under the same test description
describe("Test /annees route", () => {
  test("Get/annees should always return status code 200", async () => {
    await request(app)
      .get("/annees")
      .expect("Content-type", /json/)
      .expect(200);
  });
  test("Get/annees/id should return status code 404, 'cause we passed in an id that doesn't exist in the DB", async () => {
    await request(app)
      .get("/annees/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Delete/annees/id, status(404) because we are sending an id that is not found in the database", async () => {
    await request(app)
      .delete("/annees/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Post/annees/, Add a new Annees, status(400) because there's no 'name' property", async () => {
    /**
     * This request should return a 400 error
     * because the sent object doesn't contain the 'name' property
     * to make it return a 201 status code, we just need to add the 'name' property to the object
     */
    await request(app)
      .post("/annees")
      .send({ names: "Commercial et Gestion" })
      .expect("Content-type", /json/)
      .expect(400);
  });
});
