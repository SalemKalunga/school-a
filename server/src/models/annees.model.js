const sql = require("./data-access-object/dao");

const getAnnees = async () => {
  try {
    const [rows] = await sql.query("SELECT*FROM annees");
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getAnnee = async (id) => {
  try {
    const user = await sql.query("SELECT * FROM annees WHERE id=?", [id]);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addAnnee = async (name) => {
  try {
    const result = await sql.query(
      `
          INSERT INTO annees(name)
          VALUE(?);
      `,
      [name]
    );
    const id = result[0].insertId;
    const user = await getAnnee(id);
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteAnnee = async (id) => {
  try {
    const Annee = await getAnnee(id);

    if (!Annee.length) return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM annees
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
  getAnnees,
  addAnnee,
  getAnnee,
  deleteAnnee,
};
