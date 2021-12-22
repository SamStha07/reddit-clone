import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import commentRoutes from './routes/comments';
import trim from './middleware/trim';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

env.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.get('/', (_, res) => res.send('Hello world'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/comments', commentRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Serve is running at port:${process.env.PORT}`);

  try {
    await createConnection();
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
});
