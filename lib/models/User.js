import { clientPromise, connectToDatabase } from "@/lib/mongodb";
import { genSalt, hash, compare } from "bcryptjs";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Schema.Types.ObjectId(),
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    fields: { type: String },
    blogId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

// Helper functions for User model
export async function getUserByEmail(email) {
  try {
    console.log("=== getUserByEmail called ===");
    console.log("Email parameter:", email);
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "NOT SET");

    // Use MongoDB native client for consistency with other functions
    console.log("Getting clientPromise...");
    const client = await clientPromise;
    console.log("Client obtained successfully");

    const db = client.db();
    console.log("Database instance obtained");
    console.log("Fetching user by email:", email);

    // First, let's see what collections exist
    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Check total count in users collection
    const userCount = await db.collection("users").countDocuments();
    console.log("Total users in collection:", userCount);

    // Get all users for debugging
    const allUsers = await db.collection("users").find().toArray();
    console.log("All users fetched:", allUsers);

    const user = await db.collection("users").findOne({ email: email });
    console.log("User fetched by email:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user");
  }
}

export async function getUserById(id) {
  try {
    const client = await clientPromise;
    const db = client.db();
    return await db.collection("users").findOne({ _id: new ObjectId(id) }); // Convert to ObjectId
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user");
  }
}

export async function createUser(userData) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Prepare user object
    const user = {
      ...userData,
      role: userData.role || "User",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Hash password
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    // Insert into database
    const result = await db.collection("users").insertOne(user);
    return { ...user, _id: result.insertedId };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

export async function updateUser(id, userData) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Prepare update data
    const updateData = {
      ...userData,
      updatedAt: new Date(),
    };

    // Hash password if it's being updated
    if (updateData.password) {
      const salt = await genSalt(10);
      updateData.password = await hash(updateData.password, salt);
    }

    // Update in database
    await db.collection("users").updateOne(
      { _id: new ObjectId(id) }, // Convert to ObjectId
      { $set: updateData }
    );

    return await getUserById(id);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}

export async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Could not compare passwords");
  }
}

// Export a default object with all the methods
const UserModel = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  comparePassword,
  userModel,
};

export default UserModel;
