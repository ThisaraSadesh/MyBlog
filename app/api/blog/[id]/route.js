import { connectToDatabase } from "../../../../lib/mongodb";
import BlogModel from "../../../../lib/models/Blog";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return new Response(
        JSON.stringify({ error: "Blog not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}