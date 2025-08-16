import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert Blob to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await cloudinary.uploader.upload_stream(
      { folder: "dtf_uploads" },
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    );

    // This is slightly tricky in Cloudinary v2 with streams. Alternative:
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      { folder: "dtf_uploads" }
    );

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
