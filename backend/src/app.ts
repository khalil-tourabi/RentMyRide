import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoute from './routes/authRoutes';
import adminRoute from './routes/adminRoutes';
import agencyRoute from './routes/agencyRoutes';
import userRoute from './routes/userRoute';
import generalRoute from './routes/generalRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', authRoute);
app.use('/api', adminRoute);
app.use('/api', agencyRoute);
app.use('/api', userRoute);
app.use('/api', generalRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
