import app from "./app.js";
import { sequelize } from "./database/database.js";
import config from "./utils/config.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
