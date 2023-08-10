import AWS from "aws-sdk";
import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";

import accessoryData from "../seeds/accessoryData.json" assert { type: "json" };

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIAS3AUNLLOH2ULWWJN",
  secretAccessKey: "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",
  region: "us-east-2",
});

// Create S3 service object
const s3 = new AWS.S3();

// Upload images to S3
async function uploadImages() {
  const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
  const imageDir = path.join(currentDirectory, "../assets/images/accessories");
  const images = await fs.readdir(imageDir);

  for (const image of images) {
    const imagePath = path.join(imageDir, image);
    const imageStream = createReadStream(imagePath);
    const key = `product-images/${image}`;

    // Extract imageRef from image filename
    const imageRef = parseInt(image.split(".")[0]); // Assumes image filename is the reference number, like 1.jpg

    // Upload image to S3
    const params = {
      Bucket: "kb-fanatics-accessories",
      Key: key,
      Body: imageStream,
      ACL: "public-read",
    };

    const s3UploadResponse = await s3.upload(params).promise();

    // Update the seedData with the new imageURL
    const product = accessoryData.find((p) => p.imageRef === imageRef);
    if (product) {
      product.imageURL = s3UploadResponse.Location;
    }
  }

  const accessoryDataPath = path.join(currentDirectory, "../seeds/accessoryData.json");
  await fs.writeFile(accessoryDataPath, JSON.stringify(accessoryData, null, 2));
}

uploadImages().catch(console.error);