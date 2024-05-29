import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db();

// Define your database collections
const userPreferencesCollection = db.collection('userPreferences');

// Perform CRUD operations using the collection
async function createUserPreference(newPreference) {
  try {
    const result = await userPreferencesCollection.insertOne(newPreference);
    console.log(`Created new preference with id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error creating user preference:', error);
  }
}

async function getUserPreferences() {
  try {
    const preferences = await userPreferencesCollection.find().toArray();
    console.log('User preferences:', preferences);
    return preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
  }
}

async function updateUserPreference(id, updatedPreference) {
  try {
    const result = await userPreferencesCollection.updateOne({ _id: id }, { $set: updatedPreference });
    console.log(`Updated preference with id: ${id}`);
  } catch (error) {
    console.error('Error updating user preference:', error);
  }
}

async function deleteUserPreference(id) {
  try {
    const result = await userPreferencesCollection.deleteOne({ _id: id });
    console.log(`Deleted preference with id: ${id}`);
  } catch (error) {
    console.error('Error deleting user preference:', error);
  }
}