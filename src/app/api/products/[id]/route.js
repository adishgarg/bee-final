import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/product";
import jwt from "jsonwebtoken";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
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

    // Ensure the requesting seller owns the product.
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.seller.toString() !== decoded.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await product.deleteOne();
    return NextResponse.json({ message: "Product removed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}