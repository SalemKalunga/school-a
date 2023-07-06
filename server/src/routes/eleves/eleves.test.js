const request = require("supertest");
const app = require("../../index");
// We use describe("",()=>{}) to group a group tests under the same test description
describe("ELEVES TEST: Test /eleves route", () => {
  test("Get/eleves should always return status code 200", async () => {
    await request(app)
      .get("/eleves")
      .expect("Content-type", /json/)
      .expect(200);
  });
  test("Get/eleves/id should return status code 404, 'cause we passed in an id that doesn't exist in the DB", async () => {
    await request(app)
      .get("/eleves/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Delete/eleves/id, status(404) because we are sending an id that is not found in the database", async () => {
    await request(app)
      .delete("/eleves/1")
      .expect("Content-type", /json/)
      .expect(404);
  });
  test("Post/eleves/, Add a new Section, status(400) Because there are missing properties in the Sent Object", async () => {
    /**
     * This request should return a 400 error
     * because the sent object doesn't contain the 'name' property
     * to make it return a 201 status code, we just need to add the 'name' property to the object
     */
    const obj = {
      matricule: "2023010102A",
      nom: "Zinda",
      postnom: "Kabamba",
      prenom: "Marry",
      date_de_naissance: "2023-07-20",
      genre: "F",
      lieu_de_naissance: "Kasumbalesa",
      adresse: "Kasumbalesa/Katuba N°223",
      nom_du_responsable: "KASONGO LUBMBALA",
      telephone_du_responsable: "+243975340361",
      idAnneeScholaire: 2,
      idClasse: 3,
      idOption: 2,
      idSection: 2,
      photo: "user.png",
      est_confirmee: 0,
      a_abandonnee: 0,
      idAnnees: 3,
    };
    await request(app)
      .post("/eleves")
      .send(obj)
      .expect("Content-type", /json/)
      .expect(400);
  });
});
