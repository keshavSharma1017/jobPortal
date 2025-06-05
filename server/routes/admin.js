import express from 'express';
import { Router } from 'express';

const router = Router();

// Admin routes will go here
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes working' });
});

export default router;