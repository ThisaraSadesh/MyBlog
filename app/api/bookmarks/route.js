import { connectToDatabase } from "../../../lib/mongodb";
import BookmarksModel from '../../../lib/models/Bookmarks'
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
await connectToDatabase();
const Bookmarks=await BookmarksModel.find();

return NextResponse.json({Bookmarks:Bookmarks});




}
export async function POST(req) {
    await connectToDatabase();
    const data= await req.json();
    await BookmarksModel.insertMany({userId:new ObjectId(data.userId),blogId:new ObjectId(data.blogId)})
    return NextResponse.json({sucess:'created Successfully'});
}

