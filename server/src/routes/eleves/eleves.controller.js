const {
  getEleves,
  addEleve,
  deleteEleve,
  getEleveById,
  confirmeeEleve,
} = require("../../models/eleves.model");

const httpGetEleves = async (req, res) => {
  const Eleves = await getEleves();
  return res.status(200).json(Eleves);
};

const httpAddEleve = async (req, res) => {
  const obj = req.body;
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
  if (
    !nom ||
    !postnom ||
    !prenom ||
    !date_de_naissance ||
    !genre ||
    !lieu_de_naissance ||
    !adresse ||
    !nom_du_responsable ||
    !telephone_du_responsable ||
    !idAnneeScholaire ||
    !idClasse ||
    !idSection ||
    !idOption ||
    !idAnnee
  )
    return res.status(400).json({
      status: "error",
      message: "The request must have the required properties",
    });
  const Eleve = await addEleve(obj);
  return res.status(201).json(Eleve);
};

const httpGetEleveById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getEleveById(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteEleve = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteEleve(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};
const httpConfirmeeEleve = async (req, res) => {
  const id = Number(req.params.id);
  const data = await confirmeeEleve(id);
  if (data.status) {
    return res.status(data.status).json(data);
  }
  res.status(202).json(data);
};
module.exports = {
  httpGetEleves,
  httpAddEleve,
  httpGetEleveById,
  httpDeleteEleve,
  httpConfirmeeEleve,
};
