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

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updateTagData = await Tag.update(req.body, {
    where: { id: req.params.id },
  }).catch((err) => res.status(500).json(err));
  if (!updateTagData[0]) {
    return res.status(404).json({
      error_message: `No update done since the Tag ID ${req.params.id} doesn't exist. Please double check your Tag ID.`,
    });
  }
  //res.status(200).json(updateCategoryData); //shows JSON success info
  res.status(200).json({ message: "Your tag was updated successfuly." });
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: { id: req.params.id },
  });
  if (!deletedTag) {
    return res.status(404).json({
      error_message: `Cannot be deleted because the tag ID ${req.params.id} does not exist.`,
    });
  }
  res.status(200).json({ message: "The tag has successfully been deleted." });
});

module.exports = router;
