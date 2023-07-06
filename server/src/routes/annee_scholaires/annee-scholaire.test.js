const request = require("supertest");
const app = require("../../index");
// We use describe("",()=>{}) to group a group tests under the same test description
describe("Test /annee-scholaires route", () => {
  test("Get/annee-scholaires should always return status code 200", async () => {
    await request(app)
      .get("/annee-scholaires")
      .expect("Content-type", /json/)
      .expect(200);
  });
  test("Get/annee-scholaires/id should return status code 404, 'cause we passed in an id that doesn't exist in the DB", async () => {
    await request(app)
      .get("/annee-scholaires/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Delete/annee-scholaires/id, status(404) because we are sending an id that is not found in the database", async () => {
    await request(app)
      .delete("/annee-scholaires/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Post/annee-scholaires/, Add a new Annee-scholaires, status(400) because there's no 'name' property", async () => {
    /**
     * This request should return a 400 error
     * because the sent object doesn't contain the 'name' property
     * to make it return a 201 status code, we just need to add the 'name' property to the object
     */
    await request(app)
      .post("/annee-scholaires")
      .send({ names: "Commercial et Gestion" })
      .expect("Content-type", /json/)
      .expect(400);
  });
});
