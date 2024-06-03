import express from 'express';
import { insertData, updateData, getData, getAllData } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', insertData);
router.put('/user/:id', updateData);
router.get('/user/:id', getData);
router.get('/get', getAllData)

export default router;
