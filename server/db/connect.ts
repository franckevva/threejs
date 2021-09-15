import * as mongoose from "mongoose";

function connect() {
  const dbUri = process.env.DB_URI as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      console.info("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

export default connect;
