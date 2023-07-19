const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    }
  }

  async connect() {
    try {
      await this.client.connect();
      this.isAlive = true; // Update isAlive to true after successful connection
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const usersCollection = db.collection('users');
      const numUsers = await usersCollection.countDocuments();
      return numUsers;
    } catch (error) {
      return 0;
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const numFiles = await filesCollection.countDocuments();
      return numFiles;
    } catch (error) {
      return 0;
    }
  }

  async getUserByEmail(email) {
    try {
      // Check if the client is connected, and if not, connect to MongoDB
      if (!this.isAlive()) {
        await this.client.connect();
        console.log('Connected to MongoDB');
      }
      const db = this.client.db();
      const collection = db.collection('users');
      const user = await collection.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error retrieving user by email:', error);
      return null;
    }
  }

  async createUser(newUser) {
    try {
      // Check if the client is connected, and if not, connect to MongoDB
      if (!this.isAlive()) {
        await this.connect();
      }
      const db = this.client.db();
      const collection = db.collection('users');
      const result = await collection.insertOne(newUser);
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
