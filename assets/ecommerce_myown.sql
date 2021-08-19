SELECT category.category_name, product.product_name
FROM category
INNER JOIN product ON product.category_id = category.id;