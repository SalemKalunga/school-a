const sql = require("./data-access-object/dao");

const getAnneeScholaires = async () => {
  try {
    const [rows] = await sql.query("SELECT*FROM annee_scholaires");
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getAnneeScholaire = async (id) => {
  try {
    const user = await sql.query("SELECT * FROM annee_scholaires WHERE id=?", [
      id,
    ]);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addAnneeScholaire = async (name) => {
  try {
    const result = await sql.query(
      `
          INSERT INTO annee_scholaires(name)
          VALUE(?);
      `,
      [name]
    );
    const id = result[0].insertId;
    const user = await getAnneeScholaire(id);
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteAnneeScholaire = async (id) => {
  try {
    const AnneeScholaire = await getAnneeScholaire(id);

    if (!AnneeScholaire.length)
      return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM annee_scholaires
      WHERE id=?
      `,
      [id]
    );
    return { status: 200, message: "Supprimée avec succès" };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  getAnneeScholaires,
  addAnneeScholaire,
  getAnneeScholaire,
  deleteAnneeScholaire,
};
