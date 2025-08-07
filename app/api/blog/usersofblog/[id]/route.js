import { connectToDatabase } from "../../../../../lib/mongodb";
import UsersAssignedBlogs from "../../../../../lib/models/User-Assigned-Blogs";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    console.log("userID", id);
    const UserRecords = await UsersAssignedBlogs.find({
      userId: new ObjectId(id),
    }).populate("blogId");
    console.log('UserRecords Length',UserRecords.length)

    // console.log("UserRecords", UserRecords);
    if (!UserRecords) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(UserRecords), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
