const {
  getAnnees,
  addAnnee,
  getAnnee,
  deleteAnnee,
} = require("../../models/annees.model");

const httpGetAnnees = async (req, res) => {
  const Annees = await getAnnees();
  return res.status(200).json(Annees);
};

const httpAddAnnee = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      status: "error",
      message: "The request must have the 'name' property",
    });
  const Annee = await addAnnee(name);
  return res.status(201).json(Annee);
};

const httpGetAnnee = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getAnnee(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteAnnee = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteAnnee(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

module.exports = {
  httpGetAnnees,
  httpAddAnnee,
  httpGetAnnee,
  httpDeleteAnnee,
};
