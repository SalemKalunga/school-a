const {
  getSections,
  addSection,
  getSection,
  deleteSection,
} = require("../../models/sections.model");

const httpGetSections = async (req, res) => {
  const sections = await getSections();
  return res.status(200).json(sections);
};

const httpAddSection = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      status: "error",
      message: "The request must have the 'name' property",
    });
  const section = await addSection(name);
  return res.status(201).json(section);
};

const httpGetSection = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getSection(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteSection = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteSection(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

module.exports = {
  httpGetSections,
  httpAddSection,
  httpGetSection,
  httpDeleteSection,
};
