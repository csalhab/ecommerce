const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.json(tagData);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagIdData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).catch((err) => res.status(500).json(err));
  if (!tagIdData)
    return res
      .status(404)
      .json({ message: `There is no tag by the ID of ${req.params.id}` });
  res.status(200).json(tagIdData);
});

router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body).catch((err) =>
    res.status(500).json(err.message)
  );
  res.status(200).json(newTag);
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
