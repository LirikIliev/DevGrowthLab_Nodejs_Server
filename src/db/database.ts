import { connect } from 'mongoose';
import { DATABASE_MESSAGES, DATABASE_URL } from './config';

export const databaseConnection = (cb: () => void) => {
  connect(DATABASE_URL)
    .then(() => {
      console.log(DATABASE_MESSAGES.SUCCESS);
      cb();
    })
    .catch(() => console.error(DATABASE_MESSAGES.FAIL));
};
