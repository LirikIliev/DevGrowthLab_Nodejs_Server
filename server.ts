import express from 'express';

import { SERVER_PORT } from './src/config/config';
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/category';
import bannerRoutes from './src/routes/banner';
import brandsRoute from './src/routes/brand';
import postsRoute from './src/routes/blog';
import { databaseConnection } from './src/db/database';
import { headersMiddleware } from './src/middlewares/headersMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headersMiddleware);

app.use('/user', authRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/banner', bannerRoutes);
app.use('/brands', brandsRoute);
app.use('/blog', postsRoute);

const serverConnection = () =>
  app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on port ${SERVER_PORT}`)
  );

databaseConnection(serverConnection);
