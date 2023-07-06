const {
  getAnneeScholaires,
  addAnneeScholaire,
  getAnneeScholaire,
  deleteAnneeScholaire,
} = require("../../models/annee-scholaire.model");

const httpGetAnneeScholaires = async (req, res) => {
  const AnneeScholaires = await getAnneeScholaires();
  return res.status(200).json(AnneeScholaires);
};

const httpAddAnneeScholaire = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      status: "error",
      message: "The request must have the 'name' property",
    });
  const AnneeScholaire = await addAnneeScholaire(name);
  return res.status(201).json(AnneeScholaire);
};

const httpGetAnneeScholaire = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getAnneeScholaire(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteAnneeScholaire = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteAnneeScholaire(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

module.exports = {
  httpGetAnneeScholaires,
  httpAddAnneeScholaire,
  httpGetAnneeScholaire,
  httpDeleteAnneeScholaire,
};
