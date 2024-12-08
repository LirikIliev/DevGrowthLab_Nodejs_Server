import { Router, Request, Response } from 'express';
import { products } from '../testData/data';
import { ProductInterface, ProductQueryType } from './types';
const router = Router();

router.get('/list-of-products', (req: Request, res: Response) => {
  res.json({ products });
});

router.get(
  '/:productId/product-data',
  (req: Request<ProductQueryType>, res: Response) => {
    const productId = req.params.productId;
    const productIndex = products.findIndex((pr) => pr.id === productId);

    if (productIndex < 0) {
      res.status(400).json({ message: 'The product info is missing!' });
      return;
    }

    const product = products[productIndex];

    res.status(200).json(product);
  }
);

router.put('/:productId/update-product', (req: Request, res: Response) => {
  const productId = req.params.productId;
  const body = req.body as ProductInterface;

  if (!body.type || !body.name || !body.price) {
    res.status(400).json({ message: 'The product info is missing' });
    return;
  }

  const productIndex = products.findIndex((pr) => pr.id === productId);

  if (productIndex < 0) {
    res.status(400).json({ message: 'Product is missing' });
    return;
  }

  const updatedProduct = {
    id: products[productIndex].id,
    name: body.name,
    price: Number(body.price),
    type: body.type,
  };

  products.splice(productIndex, 1, updatedProduct);

  res.status(200).json({
    message: 'The product was successfully updated!',
    product: products[productIndex],
  });
});

router.delete(
  '/:productId/delete-product',
  (req: Request<ProductQueryType>, res: Response) => {
    const productId = req.params.productId;

    const productIndex = products.findIndex((pr) => pr.id === productId);
    if (productIndex < 0) {
      res.status(400).json({ message: 'The product is missing!' });
      return;
    }

    products.splice(productIndex, 1);

    res
      .status(200)
      .json({ message: 'The product is successfully removed!', products });
  }
);

export default router;
