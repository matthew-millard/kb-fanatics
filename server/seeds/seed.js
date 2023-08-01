import db from "../config/connection.js";
import Switch from "../models/index.js";
import switchData from "./switchData.json" assert { type: "json" };

db.once("open", async () => {
  try {
    // drop all databases
    await Switch.deleteMany({});

    // bulk create each model
    await Switch.insertMany(switchData);

    console.log("Database seeded 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database: ", error);
    process.exit(1);
  }
});
