import { connectToDatabase } from "../../../lib//mongodb";
import BlogModel from "../../../lib/models/Blog";

export async function GET(request) {
  try {
    await connectToDatabase();
    // List collections in the database and log them

    const blogs = await BlogModel.find({});
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
