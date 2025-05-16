import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/product";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if the user is a seller.
    if (decoded.role !== "seller") {
        console.log(decoded.role);
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Get product info from the request body.
    const { name, price, description, image, category } = await request.json();
    console.log("Received product data:", { name, price, description, image, category });

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    if (!category || (category !== "male" && category !== "female")) {
      return NextResponse.json({ error: "Category must be either 'male' or 'female'" }, { status: 400 });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      seller: decoded.id,
    });
    console.log("Product created:", product);

    return NextResponse.json({ message: "Product added", product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = async (req) => {
    await dbConnect();
  
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    const token = authHeader.split(" ")[1];
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "seller") {
        return new NextResponse("Forbidden", { status: 403 });
      }
  
      const products = await Product.find({ seller: decoded.id });
      return NextResponse.json({ products });
  
    } catch (err) {
      console.error("GET /api/products error:", err.message, err.stack);
      return new NextResponse("Server Error", { status: 500 });
    }
  };