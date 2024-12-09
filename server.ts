import express from 'express';

import { SERVER_PORT } from './src/config/config';
import userRoutes from './src/routes/userRoutes';
import productRoutes from './src/routes/productRoutes';
import { databaseConnection } from './src/db/database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/product', productRoutes);

const serverConnection = () =>
  app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on port ${SERVER_PORT}`)
  );

databaseConnection(serverConnection);
