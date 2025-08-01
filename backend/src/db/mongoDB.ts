import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING!);
    console.log("[Successfully connected to the database]");
  } catch (error: any) {
    console.log("[Failed to connect to the database]");
    process.exit(1);
  }
};
