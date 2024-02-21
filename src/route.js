// route.js
import express from 'express';

const router = express.Router();

// Define a simple GET route for /home
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the home route!' });
});

export default router;