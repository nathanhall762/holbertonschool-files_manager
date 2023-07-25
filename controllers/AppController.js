// controllers/AppController.js
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const AppController = {
  async getStatus(req, res) {
    const redisAlive = await redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    const status = {
      redis: redisAlive,
      db: dbAlive,
    };

    return res.status(200).json(status);
  },

  async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      const stats = {
        users: usersCount,
        files: filesCount,
      };

      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
