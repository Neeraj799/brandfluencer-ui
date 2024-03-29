import fs from "fs";
import path from "path";
export async function GET() {
  return Response.json([]);
  // testing to display template files
  const dirRelativeToPublicFolder = "components";

  const dir = path.resolve("./src/app", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join("/", dirRelativeToPublicFolder, name)
  );

  return Response.json(images)
}