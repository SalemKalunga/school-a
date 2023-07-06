const sql = require("./data-access-object/dao");

const getSections = async () => {
  try {
    const [rows] = await sql.query("SELECT*FROM sections");
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getSection = async (id) => {
  try {
    const user = await sql.query("SELECT * FROM sections WHERE id=?", [id]);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addSection = async (name) => {
  try {
    const result = await sql.query(
      `
          INSERT INTO sections(name)
          VALUE(?);
      `,
      [name]
    );
    const id = result[0].insertId;
    const user = await getSection(id);
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteSection = async (id) => {
  try {
    const section = await getSection(id);

    if (!section.length) return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM sections
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
  getSections,
  addSection,
  getSection,
  deleteSection,
};
