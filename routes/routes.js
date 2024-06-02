import express from 'express';
import { insertData, updateData, getData } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', insertData);
router.put('/user/:id', updateData);
router.get('/user/:id', getData);

export default router;
