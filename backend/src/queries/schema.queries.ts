export const createConstraintsQuery = `
  CREATE CONSTRAINT user_id_unique IF NOT EXISTS
  FOR (u:User)
  REQUIRE u.id IS UNIQUE
`;

export const createProductIdUniqueQuery = `
  CREATE CONSTRAINT product_id_unique IF NOT EXISTS
  FOR (p:Product)
  REQUIRE p.id IS UNIQUE
`;

export const createCategoryIdUniqueQuery = `
  CREATE CONSTRAINT category_id_unique IF NOT EXISTS
  FOR (c:Category)
  REQUIRE c.id IS UNIQUE
`;

export const createBrandIdUniqueQuery = `
  CREATE CONSTRAINT brand_id_unique IF NOT EXISTS
  FOR (b:Brand)
  REQUIRE b.id IS UNIQUE
`;