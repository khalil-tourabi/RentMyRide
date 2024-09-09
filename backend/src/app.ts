import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoute from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
