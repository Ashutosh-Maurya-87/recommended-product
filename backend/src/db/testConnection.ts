import { driver } from "./driver";

export async function testDatabaseConnection() {
  const session = driver.session();

  try {
    const result = await session.run(`
            RETURN
                "CognoDB connection successful" AS message,
                datetime() AS serverTime
        `);

    const record = result.records[0];

    console.log(record.get("message"));
    console.log(
      "Database time:",
      record.get("serverTime").toString()
    );

    return true;
  } finally {
    await session.close();
  }
}