const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.json(categoryData);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryIdData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).catch((err) => res.status(500).json(err));
  if (!categoryIdData)
    return res
      .status(404)
      .json({ message: `There is no category by the ID of ${req.params.id}` });
  res.status(200).json(categoryIdData);
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
