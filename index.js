import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes.js';
import cors from "cors";

const app = express();
const corsOptions = {
  origin: [
    'https://canada-eta-portal.com',
    'http://localhost:5173',
    'https://main--form-site-bbb.netlify.app',
  ],
};

// Enable CORS for all routes or specific routes
app.use(cors(corsOptions));

// app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
