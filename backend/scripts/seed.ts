import "dotenv/config";

import neo4j from "neo4j-driver";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
  throw new Error(
    "Missing COGNODB_URI, COGNODB_USERNAME or COGNODB_PASSWORD"
  );
}

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

// -----------------------------------------------------
// USERS
// -----------------------------------------------------

const users = [
  { id: "U001", name: "Rahul Sharma", email: "rahul@example.com" },
  { id: "U002", name: "Priya Patel", email: "priya@example.com" },
  { id: "U003", name: "Amit Verma", email: "amit@example.com" },
  { id: "U004", name: "Neha Singh", email: "neha@example.com" },
  { id: "U005", name: "Arjun Mehta", email: "arjun@example.com" },
  { id: "U006", name: "Sneha Kapoor", email: "sneha@example.com" },
  { id: "U007", name: "Rohan Gupta", email: "rohan@example.com" },
  { id: "U008", name: "Ananya Joshi", email: "ananya@example.com" },
  { id: "U009", name: "Vikram Rao", email: "vikram@example.com" },
  { id: "U010", name: "Kavya Nair", email: "kavya@example.com" },
  { id: "U011", name: "Aditya Malhotra", email: "aditya@example.com" },
  { id: "U012", name: "Meera Iyer", email: "meera@example.com" },
  { id: "U013", name: "Karan Shah", email: "karan@example.com" },
  { id: "U014", name: "Ishita Das", email: "ishita@example.com" },
  { id: "U015", name: "Siddharth Jain", email: "siddharth@example.com" },
  { id: "U016", name: "Pooja Bansal", email: "pooja@example.com" },
  { id: "U017", name: "Nikhil Kumar", email: "nikhil@example.com" },
  { id: "U018", name: "Tanya Roy", email: "tanya@example.com" },
  { id: "U019", name: "Dev Agarwal", email: "dev@example.com" },
  { id: "U020", name: "Simran Kaur", email: "simran@example.com" },
];

// -----------------------------------------------------
// CATEGORIES
// -----------------------------------------------------

const categories = [
  { id: "C001", name: "Audio" },
  { id: "C002", name: "Computer Accessories" },
  { id: "C003", name: "Mobile Accessories" },
  { id: "C004", name: "Smart Home" },
  { id: "C005", name: "Wearables" },
  { id: "C006", name: "Gaming" },
  { id: "C007", name: "Office" },
  { id: "C008", name: "Storage" },
];

// -----------------------------------------------------
// BRANDS
// -----------------------------------------------------

const brands = [
  { id: "B001", name: "SoundMax" },
  { id: "B002", name: "TechPro" },
  { id: "B003", name: "NovaTech" },
  { id: "B004", name: "PixelGear" },
  { id: "B005", name: "SmartEdge" },
  { id: "B006", name: "GameForge" },
  { id: "B007", name: "WorkHub" },
  { id: "B008", name: "CoreTech" },
  { id: "B009", name: "ByteWave" },
  { id: "B010", name: "GearNest" },
];

// -----------------------------------------------------
// PRODUCTS
// -----------------------------------------------------

const products = [
  // Audio
  {
    id: "P001",
    name: "Wireless Headphones",
    description: "Over-ear wireless headphones with deep bass and long battery life.",
    price: 2499,
    rating: 4.6,
    categoryId: "C001",
    brandId: "B001",
  },
  {
    id: "P002",
    name: "Bluetooth Earbuds",
    description: "Compact wireless earbuds with clear audio and charging case.",
    price: 1799,
    rating: 4.5,
    categoryId: "C001",
    brandId: "B001",
  },
  {
    id: "P003",
    name: "Portable Bluetooth Speaker",
    description: "Portable speaker with powerful sound and water resistance.",
    price: 2199,
    rating: 4.4,
    categoryId: "C001",
    brandId: "B003",
  },
  {
    id: "P004",
    name: "Noise Cancelling Headphones",
    description: "Wireless headphones with active noise cancellation.",
    price: 3999,
    rating: 4.7,
    categoryId: "C001",
    brandId: "B001",
  },
  {
    id: "P005",
    name: "USB Desktop Speaker",
    description: "Compact USB-powered speakers designed for desktop setups.",
    price: 1299,
    rating: 4.2,
    categoryId: "C001",
    brandId: "B008",
  },
  {
    id: "P006",
    name: "Gaming Headset",
    description: "Low-latency gaming headset with microphone and surround sound.",
    price: 2899,
    rating: 4.5,
    categoryId: "C001",
    brandId: "B006",
  },

  // Computer Accessories
  {
    id: "P007",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable sensitivity.",
    price: 999,
    rating: 4.5,
    categoryId: "C002",
    brandId: "B002",
  },
  {
    id: "P008",
    name: "Mechanical Keyboard",
    description: "Compact mechanical keyboard with tactile switches.",
    price: 3499,
    rating: 4.7,
    categoryId: "C002",
    brandId: "B002",
  },
  {
    id: "P009",
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better desk ergonomics.",
    price: 1499,
    rating: 4.6,
    categoryId: "C002",
    brandId: "B007",
  },
  {
    id: "P010",
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0 ports.",
    price: 1899,
    rating: 4.4,
    categoryId: "C002",
    brandId: "B008",
  },
  {
    id: "P011",
    name: "HD Webcam",
    description: "Full HD webcam suitable for video calls and streaming.",
    price: 2299,
    rating: 4.3,
    categoryId: "C002",
    brandId: "B004",
  },
  {
    id: "P012",
    name: "Wireless Keyboard",
    description: "Slim wireless keyboard designed for productivity.",
    price: 1599,
    rating: 4.3,
    categoryId: "C002",
    brandId: "B002",
  },
  {
    id: "P013",
    name: "Ergonomic Mouse",
    description: "Vertical ergonomic mouse designed for comfortable long sessions.",
    price: 1299,
    rating: 4.4,
    categoryId: "C002",
    brandId: "B007",
  },
  {
    id: "P014",
    name: "Laptop Cooling Pad",
    description: "Dual-fan cooling pad for laptops with adjustable height.",
    price: 1199,
    rating: 4.2,
    categoryId: "C002",
    brandId: "B008",
  },

  // Mobile Accessories
  {
    id: "P015",
    name: "Fast Charger",
    description: "Compact fast charger supporting modern smartphones.",
    price: 899,
    rating: 4.5,
    categoryId: "C003",
    brandId: "B003",
  },
  {
    id: "P016",
    name: "Power Bank",
    description: "10000mAh portable power bank with fast charging.",
    price: 1399,
    rating: 4.5,
    categoryId: "C003",
    brandId: "B009",
  },
  {
    id: "P017",
    name: "USB-C Cable",
    description: "Durable braided USB-C charging and data cable.",
    price: 499,
    rating: 4.4,
    categoryId: "C003",
    brandId: "B009",
  },
  {
    id: "P018",
    name: "Wireless Charger",
    description: "Fast wireless charging pad with compact design.",
    price: 1299,
    rating: 4.3,
    categoryId: "C003",
    brandId: "B003",
  },
  {
    id: "P019",
    name: "Phone Stand",
    description: "Adjustable desktop stand for smartphones.",
    price: 699,
    rating: 4.2,
    categoryId: "C003",
    brandId: "B007",
  },
  {
    id: "P020",
    name: "Car Phone Mount",
    description: "Dashboard and air-vent compatible magnetic phone mount.",
    price: 799,
    rating: 4.3,
    categoryId: "C003",
    brandId: "B010",
  },

  // Smart Home
  {
    id: "P021",
    name: "Smart LED Bulb",
    description: "WiFi-enabled smart bulb with adjustable brightness.",
    price: 799,
    rating: 4.4,
    categoryId: "C004",
    brandId: "B005",
  },
  {
    id: "P022",
    name: "Smart Plug",
    description: "WiFi smart plug with mobile app control.",
    price: 999,
    rating: 4.3,
    categoryId: "C004",
    brandId: "B005",
  },
  {
    id: "P023",
    name: "Smart Door Sensor",
    description: "Wireless door and window sensor for smart homes.",
    price: 899,
    rating: 4.2,
    categoryId: "C004",
    brandId: "B005",
  },
  {
    id: "P024",
    name: "WiFi Security Camera",
    description: "Indoor security camera with motion detection.",
    price: 2499,
    rating: 4.5,
    categoryId: "C004",
    brandId: "B005",
  },
  {
    id: "P025",
    name: "Smart Light Strip",
    description: "Color-changing smart LED strip with app control.",
    price: 1499,
    rating: 4.4,
    categoryId: "C004",
    brandId: "B005",
  },

  // Wearables
  {
    id: "P026",
    name: "Smart Watch",
    description: "Smart watch with health tracking and notifications.",
    price: 2999,
    rating: 4.5,
    categoryId: "C005",
    brandId: "B005",
  },
  {
    id: "P027",
    name: "Fitness Band",
    description: "Lightweight fitness band with activity tracking.",
    price: 1799,
    rating: 4.3,
    categoryId: "C005",
    brandId: "B005",
  },
  {
    id: "P028",
    name: "Smart Ring",
    description: "Compact wearable for activity and sleep tracking.",
    price: 3999,
    rating: 4.1,
    categoryId: "C005",
    brandId: "B003",
  },
  {
    id: "P029",
    name: "Sports Watch",
    description: "GPS sports watch designed for outdoor activities.",
    price: 4499,
    rating: 4.6,
    categoryId: "C005",
    brandId: "B004",
  },

  // Gaming
  {
    id: "P030",
    name: "Gaming Mouse",
    description: "High precision gaming mouse with programmable buttons.",
    price: 1999,
    rating: 4.6,
    categoryId: "C006",
    brandId: "B006",
  },
  {
    id: "P031",
    name: "Gaming Keyboard",
    description: "RGB mechanical keyboard built for gaming.",
    price: 3999,
    rating: 4.7,
    categoryId: "C006",
    brandId: "B006",
  },
  {
    id: "P032",
    name: "Gaming Controller",
    description: "Wireless controller compatible with PC and consoles.",
    price: 2999,
    rating: 4.5,
    categoryId: "C006",
    brandId: "B006",
  },
  {
    id: "P033",
    name: "RGB Mouse Pad",
    description: "Large gaming mouse pad with RGB edge lighting.",
    price: 1499,
    rating: 4.4,
    categoryId: "C006",
    brandId: "B006",
  },

  // Office
  {
    id: "P034",
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp for workspaces.",
    price: 1299,
    rating: 4.4,
    categoryId: "C007",
    brandId: "B007",
  },
  {
    id: "P035",
    name: "Desk Organizer",
    description: "Minimal desktop organizer for office supplies.",
    price: 799,
    rating: 4.2,
    categoryId: "C007",
    brandId: "B007",
  },
  {
    id: "P036",
    name: "Monitor Stand",
    description: "Wood and metal monitor stand with storage space.",
    price: 1799,
    rating: 4.5,
    categoryId: "C007",
    brandId: "B007",
  },

  // Storage
  {
    id: "P037",
    name: "Portable SSD",
    description: "Fast portable SSD for backups and large files.",
    price: 4999,
    rating: 4.7,
    categoryId: "C008",
    brandId: "B009",
  },
  {
    id: "P038",
    name: "USB Flash Drive",
    description: "Compact high-speed USB flash drive.",
    price: 699,
    rating: 4.3,
    categoryId: "C008",
    brandId: "B009",
  },
  {
    id: "P039",
    name: "MicroSD Card",
    description: "High-speed memory card for phones and cameras.",
    price: 999,
    rating: 4.4,
    categoryId: "C008",
    brandId: "B009",
  },
  {
    id: "P040",
    name: "External Hard Drive",
    description: "Large-capacity external hard drive for backups.",
    price: 4299,
    rating: 4.5,
    categoryId: "C008",
    brandId: "B008",
  },
];

// -----------------------------------------------------
// PURCHASE PATTERNS
//
// These are deliberately designed to create meaningful
// "customers also bought" relationships.
// -----------------------------------------------------

const purchaseGroups = [
  // Audio + computer accessories
  ["P001", "P007", "P009"],
  ["P001", "P010", "P017"],
  ["P001", "P007", "P010"],
  ["P001", "P009", "P012"],
  ["P002", "P015", "P017"],
  ["P002", "P016", "P018"],
  ["P003", "P021", "P022"],
  ["P004", "P007", "P009"],
  ["P004", "P010", "P037"],
  ["P006", "P030", "P031", "P033"],

  // Productivity
  ["P007", "P008", "P009"],
  ["P007", "P010", "P012"],
  ["P007", "P013", "P014"],
  ["P008", "P009", "P036"],
  ["P009", "P010", "P036"],
  ["P010", "P011", "P037"],
  ["P011", "P012", "P037"],

  // Mobile
  ["P015", "P016", "P017"],
  ["P015", "P018", "P019"],
  ["P016", "P017", "P020"],
  ["P017", "P018", "P020"],

  // Smart home
  ["P021", "P022", "P025"],
  ["P021", "P024", "P025"],
  ["P022", "P023", "P024"],

  // Wearables
  ["P026", "P027", "P018"],
  ["P026", "P029", "P016"],
  ["P027", "P018", "P019"],

  // Gaming
  ["P030", "P031", "P033"],
  ["P030", "P032", "P033"],
  ["P031", "P032", "P006"],
  ["P032", "P033", "P007"],

  // Office / storage
  ["P034", "P035", "P036"],
  ["P034", "P009", "P036"],
  ["P036", "P037", "P040"],
  ["P037", "P038", "P040"],
  ["P037", "P039", "P040"],
];

// -----------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------

function getImageUrl(productId: string): string {
  return `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop`;
}

// -----------------------------------------------------
// SEED
// -----------------------------------------------------

async function seed() {
  const session = driver.session();

  try {
    console.log("🌱 Starting RecomGraph seed...\n");

    // ---------------------------------------------
    // 1. CLEAR EXISTING DEMO DATA
    // ---------------------------------------------

    console.log("Clearing existing graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("✓ Existing graph cleared\n");

    // ---------------------------------------------
    // 2. CREATE USERS
    // ---------------------------------------------

    console.log("Creating users...");

    await session.run(
      `
      UNWIND $users AS user

      CREATE (:User {
        id: user.id,
        name: user.name,
        email: user.email
      })
      `,
      { users }
    );

    console.log(`✓ Created ${users.length} users`);

    // ---------------------------------------------
    // 3. CREATE CATEGORIES
    // ---------------------------------------------

    console.log("Creating categories...");

    await session.run(
      `
      UNWIND $categories AS category

      CREATE (:Category {
        id: category.id,
        name: category.name
      })
      `,
      { categories }
    );

    console.log(`✓ Created ${categories.length} categories`);

    // ---------------------------------------------
    // 4. CREATE BRANDS
    // ---------------------------------------------

    console.log("Creating brands...");

    await session.run(
      `
      UNWIND $brands AS brand

      CREATE (:Brand {
        id: brand.id,
        name: brand.name
      })
      `,
      { brands }
    );

    console.log(`✓ Created ${brands.length} brands`);

    // ---------------------------------------------
    // 5. CREATE PRODUCTS
    // ---------------------------------------------

    console.log("Creating products...");

    const productsWithImages = products.map((product) => ({
      ...product,
      image: getImageUrl(product.id),
    }));

    await session.run(
      `
      UNWIND $products AS product

      MATCH (category:Category {id: product.categoryId})
      MATCH (brand:Brand {id: product.brandId})

      CREATE (p:Product {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
        image: product.image
      })

      CREATE (p)-[:BELONGS_TO]->(category)
      CREATE (p)-[:MADE_BY]->(brand)
      `,
      {
        products: productsWithImages,
      }
    );

    console.log(`✓ Created ${products.length} products`);
    console.log("✓ Created product → category relationships");
    console.log("✓ Created product → brand relationships\n");

    // ---------------------------------------------
    // 6. CREATE PURCHASE RELATIONSHIPS
    // ---------------------------------------------

    console.log("Creating purchase relationships...");

    const purchaseRelationships: {
      userId: string;
      productId: string;
    }[] = [];

    purchaseGroups.forEach((group, groupIndex) => {
      const user = users[groupIndex % users.length];

      group.forEach((productId) => {
        purchaseRelationships.push({
          userId: user.id,
          productId,
        });
      });
    });

    // Add additional purchases to make the graph denser.
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      const additionalProducts = [
        products[(i * 2) % products.length],
        products[(i * 2 + 7) % products.length],
        products[(i * 2 + 13) % products.length],
      ];

      additionalProducts.forEach((product) => {
        purchaseRelationships.push({
          userId: user.id,
          productId: product.id,
        });
      });
    }

    await session.run(
      `
      UNWIND $relationships AS rel

      MATCH (u:User {id: rel.userId})
      MATCH (p:Product {id: rel.productId})

      MERGE (u)-[:PURCHASED]->(p)
      `,
      {
        relationships: purchaseRelationships,
      }
    );

    console.log(
      `✓ Created ${purchaseRelationships.length} purchase relationships\n`
    );

    // ---------------------------------------------
    // 7. CREATE VIEW RELATIONSHIPS
    // ---------------------------------------------

    console.log("Creating view relationships...");

    const viewRelationships: {
      userId: string;
      productId: string;
    }[] = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < 8; j++) {
        const productIndex =
          (i * 7 + j * 3) % products.length;

        viewRelationships.push({
          userId: users[i].id,
          productId: products[productIndex].id,
        });
      }
    }

    await session.run(
      `
      UNWIND $relationships AS rel

      MATCH (u:User {id: rel.userId})
      MATCH (p:Product {id: rel.productId})

      MERGE (u)-[:VIEWED]->(p)
      `,
      {
        relationships: viewRelationships,
      }
    );

    console.log(
      `✓ Created ${viewRelationships.length} view relationships\n`
    );

    // ---------------------------------------------
    // 8. CREATE LIKE RELATIONSHIPS
    // ---------------------------------------------

    console.log("Creating like relationships...");

    const likeRelationships: {
      userId: string;
      productId: string;
    }[] = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < 4; j++) {
        const productIndex =
          (i * 5 + j * 4) % products.length;

        likeRelationships.push({
          userId: users[i].id,
          productId: products[productIndex].id,
        });
      }
    }

    await session.run(
      `
      UNWIND $relationships AS rel

      MATCH (u:User {id: rel.userId})
      MATCH (p:Product {id: rel.productId})

      MERGE (u)-[:LIKED]->(p)
      `,
      {
        relationships: likeRelationships,
      }
    );

    console.log(
      `✓ Created ${likeRelationships.length} like relationships\n`
    );

    // ---------------------------------------------
    // 9. CREATE SIMILAR_TO RELATIONSHIPS
    // ---------------------------------------------

    console.log("Creating similar-product relationships...");

    await session.run(`
      MATCH (p:Product)-[:BELONGS_TO]->(category:Category)
      MATCH (similar:Product)-[:BELONGS_TO]->(category)

      WHERE p.id < similar.id

      MERGE (p)-[:SIMILAR_TO]->(similar)
    `);

    console.log("✓ Created similar-product relationships\n");

    // ---------------------------------------------
    // 10. GET DATABASE COUNTS
    // ---------------------------------------------

    const countResult = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS type, count(n) AS count
      ORDER BY type
    `);

    console.log("========================================");
    console.log("GRAPH NODE COUNTS");
    console.log("========================================");

    countResult.records.forEach((record) => {
      console.log(
        `${record.get("type")}: ${record.get("count").toString()}`
      );
    });

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS type, count(r) AS count
      ORDER BY type
    `);

    console.log("\n========================================");
    console.log("GRAPH RELATIONSHIP COUNTS");
    console.log("========================================");

    relationshipResult.records.forEach((record) => {
      console.log(
        `${record.get("type")}: ${record.get("count").toString()}`
      );
    });

    console.log("\n========================================");
    console.log("🎉 SEED COMPLETED SUCCESSFULLY");
    console.log("========================================\n");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();