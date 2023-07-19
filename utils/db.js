const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.isAlive = false; // Initialize isAlive to false

    this.connect();
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
    if (!this.isAlive) {
      throw new Error('Database connection is not alive.');
    }

    const db = this.client.db();
    const collection = db.collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async nbFiles() {
    if (!this.isAlive) {
      throw new Error('Database connection is not alive.');
    }

    const db = this.client.db();
    const collection = db.collection('files');
    const count = await collection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = { dbClient };