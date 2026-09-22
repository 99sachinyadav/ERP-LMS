import 'dotenv/config';
import express from 'express';
import cors from 'cors';
 
import connectDB from './config/dbconnect.js';
import { setServers } from "node:dns/promises";
import educatorRouter from './routes/educatorRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';

// 1️⃣ Set DNS servers
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
 
 await connectDB();
 await connectCloudinary()

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
