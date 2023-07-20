const crypto = require('crypto');
const dbClient = require('../utils/db');

const UsersController = {
  async postNew(req, res) {
    // Check if email and password are provided
    if (!req.body.email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!req.body.password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if email already exists
    const existingUser = await dbClient.users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash password
    const passwordHash = crypto.createHash('sha1').update(req.body.password).digest('hex');

    // Save new user to database
    const newUser = await dbClient.users.insertOne({
      email: req.body.email,
      password: passwordHash,
    });

    // Send response
    return res.status(201).json({
      email: newUser.ops[0].email,
      id: newUser.ops[0]._id,
    });
  },
};

module.exports = UsersController;
