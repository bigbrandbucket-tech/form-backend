import express from 'express';
import { insertData, updateData, getData, getAllData, paymemtIntent } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', insertData);
router.put('/user/:id', updateData);
router.get('/user/:id', getData);
router.get('/get', getAllData)
router.post('/create-payment', paymemtIntent)

export default router;
