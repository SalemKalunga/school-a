const {
  getClasses,
  addClasse,
  getClasse,
  deleteClasse,
} = require("../../models/classes.model");

const httpGetClasses = async (req, res) => {
  const Classes = await getClasses();
  return res.status(200).json(Classes);
};

const httpAddClasse = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      status: "error",
      message: "The request must have the 'name' property",
    });
  const Classe = await addClasse(name);
  return res.status(201).json(Classe);
};

const httpGetClasse = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getClasse(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteClasse = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteClasse(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

module.exports = {
  httpGetClasses,
  httpAddClasse,
  httpGetClasse,
  httpDeleteClasse,
};
