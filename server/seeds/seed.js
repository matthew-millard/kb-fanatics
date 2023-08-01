import db from "../config/connection.js";
import { SwitchModel } from "../models/index.js";
import switchData from "./switchData.json" assert { type: "json" };
import { Keyboard } from "../models/index.js";
import keyboardData from "./keyboardData.json" assert { type: "json" };
import { Keycap } from "../models/index.js";
import keycapsData from "./keycapsData.json" assert { type: "json" };
import { User } from "../models/index.js";
import userData from "./userData.json" assert { type: "json" };

db.once("open", async () => {
  // drop all databases
  await SwitchModel.deleteMany({});
  await Keyboard.deleteMany({});
  await Keycap.deleteMany({});
  await User.deleteMany({});
  //   bulk create each model
  await SwitchModel.insertMany(switchData);
  await Keyboard.insertMany(keyboardData);
  await Keycap.insertMany(keycapsData);
  await User.insertMany(userData);

  console.log("Database seeded 🌱");
  process.exit(0);
});
