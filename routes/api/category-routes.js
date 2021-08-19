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

router.post("/", async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body).catch((err) =>
    res.status(500).json(err.message)
  );
  res.status(200).json(newCategory);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const updateCategoryData = await Category.update(req.body, {
    where: { id: req.params.id },
  }).catch((err) => res.status(500).json(err));
  if (!updateCategoryData[0]) {
    return res.status(404).json({
      error_message: `No update done since category ID ${req.params.id} doesn't exist. Please double check your category ID.`,
    });
  }
  //res.status(200).json(updateCategoryData); //shows JSON success info
  res.status(200).json({ message: "Your category was updated successfuly." });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: { id: req.params.id },
  });
  if (!deletedCategory) {
    return res.status(404).json({
      error_message: `Cannot be deleted because the category with ID ${req.params.id} does not exist.`,
    });
  }
  res
    .status(200)
    .json({ message: "The category has successfully been deleted." });
});

module.exports = router;
