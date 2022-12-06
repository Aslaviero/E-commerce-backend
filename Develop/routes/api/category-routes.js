const router = require("express").Router();
const { Category, Product, Category, Category } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  try {
    Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  try {
    Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!Category) {
      res.status(404).json({ message: "No product found under this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new category
router.post("/", (req, res) => {
  try {
    Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a category by its `id` value
router.put("/:id", (req, res) => {
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "There is no category with this ID!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  try {
    Category.destroy({
      where: { id: req.params.id },
    });
    if (!tripData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
