import { connectToDatabase } from "../../../lib//mongodb";
import BlogModel from "../../../lib/models/Blog";

export async function GET(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);

    const blogCount = await BlogModel.countDocuments({});

    const limit = parseInt(url.searchParams.get("limit") ?? "7", 10);
    const skip = parseInt(url.searchParams.get("skip") ?? "0", 10);
    const blogs = await BlogModel.find({}).limit(limit).skip(skip);
    return new Response(
      JSON.stringify({ blogs: blogs, blogsLength: blogCount }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
