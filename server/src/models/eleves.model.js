const sql = require("./data-access-object/dao");

const getEleves = async () => {
  try {
    const [rows] = await sql.query(
      "SELECT el.id,el.matricule,el.nom,el.postnom,el.prenom,el.date_de_naissance,el.genre,el.lieu_de_naissance,el.adresse,el.nom_du_responsable,el.telephone_du_responsable,el.idAnneeScholaire,asco.name as annee_scholaire,el.idClasse,cl.name as classe,el.idOption,opt.name as option,el.idSection,sec.name as section,el.photo,el.est_confirmee,el.a_abandonnee,el.date_creation FROM eleves el JOIN annee_scholaires asco ON el.idAnneeScholaire = asco.id JOIN classes cl ON el.idClasse = cl.id JOIN options opt ON el.idOption = opt.id JOIN sections sec ON el.idSection = sec.id;"
    );
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getEleveById = async (id) => {
  try {
    const [rows] = await sql.query(
      "SELECT el.id,el.matricule,el.nom,el.postnom,el.prenom,el.date_de_naissance,el.genre,el.lieu_de_naissance,el.adresse,el.nom_du_responsable,el.telephone_du_responsable,el.idAnneeScholaire,asco.name as annee_scholaire,el.idClasse,cl.name as classe,el.idOption,opt.name as option,el.idSection,sec.name as section,el.photo,el.est_confirmee,el.a_abandonnee,el.date_creation FROM eleves el JOIN annee_scholaires asco ON el.idAnneeScholaire = asco.id JOIN classes cl ON el.idClasse = cl.id JOIN options opt ON el.idOption = opt.id JOIN sections sec ON el.idSection = sec.id WHERE el.id = ?;",
      [id]
    );
    return rows;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateMatriculeEleve = async (matricule, id) => {
  try {
    await sql.query("UPDATE eleves SET matricule = ? WHERE id=?", [
      matricule,
      id,
    ]);
    const user = await getEleveById(id);
    return user[0];
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
const addEleve = async (obj) => {
  const {
    nom,
    postnom,
    prenom,
    date_de_naissance,
    genre,
    lieu_de_naissance,
    adresse,
    nom_du_responsable,
    telephone_du_responsable,
    idAnneeScholaire,
    idClasse,
    idAnnee,
    idOption,
    idSection,
  } = obj;
  const date = new Date();
  const matricule = 0;
  const est_confirmee = false;
  const a_abandonnee = false;
  const photo = "user.png";
  const date_creation = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  try {
    const result = await sql.query(
      `
      INSERT INTO eleves(
        matricule,
        nom,
        postnom,
        prenom,
        date_de_naissance,
        genre,
        lieu_de_naissance,
        adresse,
        nom_du_responsable,
        telephone_du_responsable,
        idAnneeScholaire,
        idClasse,
        idOption,
        idSection,
        idAnnee,
        photo,
        est_confirmee,
        a_abandonnee,
        date_creation
        )
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `,
      [
        matricule,
        nom,
        postnom,
        prenom,
        date_de_naissance,
        genre,
        lieu_de_naissance,
        adresse,
        nom_du_responsable,
        telephone_du_responsable,
        idAnneeScholaire,
        idClasse,
        idOption,
        idSection,
        idAnnee,
        photo,
        est_confirmee,
        a_abandonnee,
        date_creation,
      ]
    );
    const id = result[0].insertId;
    const matricule_b = `${date.getFullYear()}${idSection}${idOption}${idAnnee}${idClasse}${id}`;
    const eleve = await updateMatriculeEleve(matricule_b, id);
    return eleve;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const deleteEleve = async (id) => {
  try {
    const Eleve = await getEleveById(id);

    if (!Eleve.length) return { status: 404, message: "Object innéxistant" };
    const result = await sql.query(
      `
      DELETE FROM eleves
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
  getEleves,
  addEleve,
  getEleveById,
  deleteEleve,
};
