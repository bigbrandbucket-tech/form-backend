import UserData from '../models/UserData.js';

export const insertData = (req, res) => {
  const data = req.body;
  UserData.insert(data, (error, result) => {
    console.log('result', result)
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'User data inserted successfully', id: result });
  });
};

export const updateData = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  UserData.update(id, data, (error, result) => {
    if (error) {
      console.error('Error updating data:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'User data updated successfully', affectedRows: result.affectedRows });
  });
};

export const getData = (req, res) => {
  const id = req.params.id;
  UserData.findById(id, (error, result) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).json({ error: error.message });
    }
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};

export const getAllData = (req, res) => {
  UserData.findAll((error, result) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(result);
  });
};

