import { connectToDatabase } from "../../../../lib/mongodb";
import bookmarkModel from "../../../../lib/models/Bookmarks";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const bookmarksForUser = await bookmarkModel.find({ userId: id });
    return NextResponse.json({ bookmarks: bookmarksForUser, status: 200 });
  } catch (error) {
    return NextResponse.json({error:error})
  }
}
