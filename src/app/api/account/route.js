import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await dbConnect();

    // Retrieve the Authorization header and extract token
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verify the token (ensure JWT_SECRET is set in your environment)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch the user by ID (assumes your token payload contains the user's id under 'id')
    const user = await User.findById(decoded.id).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return only the needed fields (e.g. name and cart)
    return NextResponse.json({ name: user.name, cart: user.cart || [], role: user.role || "user" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}