import UserData from '../models/UserData.js';
import Stripe from "stripe";

const stripe = new Stripe(
  "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"
);
import paypal from '@paypal/checkout-server-sdk';

// const environment = new paypal.core.LiveEnvironment(
//   'AXR-yGRo04puXuV_nMIgGO6oeO_7PBcFxU0ieFLRei8oTHlvF1kyzhH5dTH6M7N1UV7PLJ03QzXPAzk6',
//   'PAYPAL_CLIENT_SECRET'
// );
// const paypalClient = new paypal.core.PayPalHttpClient(environment);
const environment = new paypal.core.SandboxEnvironment('AQbGfUMi_-GeuUpGOtoWVsC61MjF_b0zll4KaKHkOXjVadggTeVxhlFYdhe3ebRCr-lBrS_raHq9K01c', 'EIVscdKgNKWAXgIQY3Lfs1Q2ZUX38FnfFu9aVSqA5lQCgfPCirkxRdjcLymvUh5awjECFy8VBY_F0chV');
const paypalClient = new paypal.core.PayPalHttpClient(environment);
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

export const payment = (req, res) => {
  const data = req.body;
  console.log("Called!",data);
  UserData.payment(data, (error, result) => {
  
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Payment Success successfully', id: result });
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
export async function captureOrder (req, res) {
  const { orderId } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json({ status: capture.result.status, id: capture.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error capturing order');
  }
}
export async function paymentIntent(req, res) {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '1000.00',  // Amount in USD
        },
      }],
    });

    const order = await paypalClient.execute(request);
    
    UserData.updateTransaction(req.body.id, order.result.id, (error, result) => {
      if (error) {
        console.error('Error updating transaction:', error);
        return res.status(500).json({ error: error.message });
      }
    });
    
    res.status(201).json({ id: order.result.id, status: order.result.status });
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
