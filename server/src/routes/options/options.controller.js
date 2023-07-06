const {
  getOptions,
  addOption,
  getOption,
  deleteOption,
} = require("../../models/options.model");

const httpGetOptions = async (req, res) => {
  const Options = await getOptions();
  return res.status(200).json(Options);
};

const httpAddOption = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      status: "error",
      message: "The request must have the 'name' property",
    });
  const Option = await addOption(name);
  return res.status(201).json(Option);
};

const httpGetOption = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "No 'id' parameter in the request body",
    });
  }
  const result = await getOption(id);
  if (!result.length) {
    return res
      .status(404)
      .json({ status: "error", message: "Object not found" });
  }
  return res.status(200).json(result[0]);
};

const httpDeleteOption = async (req, res) => {
  const id = req.params.id;
  const { status, message } = await deleteOption(id);
  if (status !== 200) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

module.exports = {
  httpGetOptions,
  httpAddOption,
  httpGetOption,
  httpDeleteOption,
};
