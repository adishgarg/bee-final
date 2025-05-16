import { NextResponse } from "next/server";
import Product from "../../../models/product";
import dbConnect from "../../../utils/dbConnect";

export const GET = async () => {
  await dbConnect();

  try {
    const products = await Product.find();  
    return NextResponse.json({ products });
  } catch (err) {
    console.error("GET /api/public-products error:", err.message, err.stack);
    return new NextResponse("Server Error", { status: 500 });
  }
};