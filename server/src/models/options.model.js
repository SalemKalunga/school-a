const mysql = require("mysql2");
require("dotenv").config();

// Create a connection to the database
const sql = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getOptions = async () => {
  try {
    const [rows] = await sql.query("SELECT*FROM options");
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getOption = async (id) => {
  try {
    const user = await sql.query("SELECT * FROM options WHERE id=?", [id]);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const addOption = async (name) => {
  try {
    const result = await sql.query(
      `
          INSERT INTO options(name)
          VALUE(?);
      `,
      [name]
    );
    const id = result[0].insertId;
    const user = await getOption(id);
    return user;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteOption = async (id) => {
  try {
    const Option = await getOption(id);

    if (!Option.length) return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM options
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
  getOptions,
  addOption,
  getOption,
  deleteOption,
};
