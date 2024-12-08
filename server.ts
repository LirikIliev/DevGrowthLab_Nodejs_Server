import express from 'express';

import { SERVER_PORT } from './src/config/config';
import userRoutes from './src/routes/userRoutes';
import productRoutes from './src/routes/productRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/product', productRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port ${SERVER_PORT}`)
);
