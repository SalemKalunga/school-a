const sql = require("./data-access-object/dao");

const getClasses = async () => {
  try {
    const [rows] = await sql.query("SELECT*FROM classes");
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getClasse = async (id) => {
  try {
    const user = await sql.query("SELECT * FROM classes WHERE id=?", [id]);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addClasse = async (name) => {
  try {
    const result = await sql.query(
      `
          INSERT INTO classes(name)
          VALUE(?);
      `,
      [name]
    );
    const id = result[0].insertId;
    const user = await getClasse(id);
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteClasse = async (id) => {
  try {
    const Classe = await getClasse(id);

    if (!Classe.length) return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM classes
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
  getClasses,
  addClasse,
  getClasse,
  deleteClasse,
};
