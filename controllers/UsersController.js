// controllers/AppController.js
const crypto = require('crypto');
const dbClient = require('../utils/db');

class AppController {
  // Existing methods...

  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await dbClient.getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    const newUser = {
      email,
      password: hashedPassword,
    };

    try {
      const result = await dbClient.createUser(newUser);
      const { _id, email: userEmail } = result.ops[0];
      return res.status(201).json({ id: _id, email: userEmail });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AppController;
