// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
// A Category as having Product to create a fk in the product table:
// Category.hasOne(Product, {
//   foreignKey: "category_id",
// });
// Can also define the association starting with Product:
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: "product_tag",
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: "product_tag",
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
