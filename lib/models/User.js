import { connectToDatabase } from '@/lib/mongodb';
import { genSalt, hash, compare } from 'bcryptjs';
import { ObjectId } from 'mongodb'; // Import ObjectId for _id conversion

// Helper functions for User model
export async function getUserByEmail(email) {
  try {
    const { db } = await connectToDatabase();
 
     const user=await db.collection('Users').findOne({
      email: email 
    });

     return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Could not fetch user');
  }
}

export async function getUserById(id) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection('Users').findOne({ _id: new ObjectId(id) }); // Convert to ObjectId
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Could not fetch user');
  }
}

export async function createUser(userData) {
  try {
    const { db } = await connectToDatabase();

    // Prepare user object
    const user = {
      ...userData,
      role: userData.role || 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Hash password
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    // Insert into database
    const result = await db.collection('Users').insertOne(user);
    return { ...user, _id: result.insertedId };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Could not create user');
  }
}

export async function updateUser(id, userData) {
  try {
    const { db } = await connectToDatabase();

    // Prepare update data
    const updateData = {
      ...userData,
      updatedAt: new Date()
    };

    // Hash password if it's being updated
    if (updateData.password) {
      const salt = await genSalt(10);
      updateData.password = await hash(updateData.password, salt);
    }

    // Update in database
    await db.collection('Users').updateOne(
      { _id: new ObjectId(id) }, // Convert to ObjectId
      { $set: updateData }
    );

    return await getUserById(id);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Could not update user');
  }
}

export async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Could not compare passwords');
  }
}

// Export a default object with all the methods
const UserModel = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  comparePassword
};

export default UserModel;
