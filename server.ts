import express from 'express';

import { SERVER_PORT } from './src/config/config';
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/category';
import { databaseConnection } from './src/db/database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', authRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);

const serverConnection = () =>
  app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on port ${SERVER_PORT}`)
  );

databaseConnection(serverConnection);
