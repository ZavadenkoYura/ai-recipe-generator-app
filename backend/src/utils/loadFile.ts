import path from "path";
import fs from "fs";

export const loadFile = (file: Express.Multer.File) => {
  const fileDestination = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    file!.filename
  );
  if (!fs.existsSync(fileDestination)) {
    return null;
  }

  const encodedFile = fs.readFileSync(fileDestination, "base64");

  return encodedFile;
};
