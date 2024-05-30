import { MongoClient } from 'ongodb';

dotenv.config({ path: '../.env' }); 

const mongoUri = process.env.MONGODB_URI;
const dbName = 'Cluster0';
const collectionName = 'weather_app';

let client;
let db;
let collection;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(mongoUri);
    db = client.db(dbName);
    collection = db.collection(collectionName);
  }
  return collection;
}

export async function fetchUserPreferences() {
  const collection = await connectToMongo();
  try {
    const preferences = await collection.find().toArray();
    return preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
}

export async function createUserPreference(newPreference) {
  const collection = await connectToMongo();
  try {
    const result = await collection.insertOne(newPreference);
    return result.insertedId;
  } catch (error) {
    console.error('Error creating user preference:', error);
    throw error;
  }
}

export async function updateUserPreference(id, updatedPreference) {
  const collection = await connectToMongo();
  try {
    const result = await collection.updateOne({ _id: id }, { $set: updatedPreference });
    return result.modifiedCount;
  } catch (error) {
    console.error('Error updating user preference:', error);
    throw error;
  }
}

export async function deleteUserPreference(id) {
  const collection = await connectToMongo();
  try {
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting user preference:', error);
    throw error;
  }
}