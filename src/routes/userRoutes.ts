import { Router, Request, Response } from 'express';
import { UserRequestInterface } from './types';
import { users } from '../testData/data';

const router = Router();

router.post('/login', (req: Request<UserRequestInterface>, res: Response) => {
  const body = req.body as UserRequestInterface;

  if (!body.email || !body.password) {
    res.status(400).json({ message: 'The user data is not filled correctly!' });
    return;
  }

  const userIndex = users.findIndex(
    (us) => us.email === body.email && us.password === body.password
  );

  if (userIndex < 0) {
    res
      .status(400)
      .json({ message: 'Something is went wrong, please try again latter!' });
    return;
  }

  const user = users[userIndex];

  res.status(200).json({ message: 'User is logged successfully!', user });
});

router.post(
  '/registration',
  (req: Request<UserRequestInterface>, res: Response) => {
    const body = req.body as UserRequestInterface;

    if (!body.email || !body.password) {
      res.status(400).json({ message: 'User data is not correctly fufilled.' });
      return;
    }

    res
      .status(200)
      .json({ message: 'User data is correctly fufilled!', user: body });
  }
);

export default router;
