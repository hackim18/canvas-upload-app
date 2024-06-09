import { NextResponse } from "next/server";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("File is not an image"), false);
    }
    cb(null, true);
  },
});

const uploadMiddleware = upload.single("image");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const req = {
    headers: request.headers,
    file: {
      fieldname: "image",
      originalname: file.name,
      mimetype: file.type,
      buffer: buffer,
    },
    body: formData,
  };
  const res = {
    setHeader: () => {},
    end: () => {},
  };

  try {
    await runMiddleware(req, res, uploadMiddleware);

    if (!req.file) {
      return NextResponse.json({ error: "File is not an image" }, { status: 400 });
    }

    return NextResponse.json({ filename: req.file.originalname, buffer: req.file.buffer }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Canvas Upload App" });
}
