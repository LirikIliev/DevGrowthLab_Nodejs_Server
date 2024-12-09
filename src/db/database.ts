import { connect } from 'mongoose';
import { DATABASE_URL } from './config';

export const databaseConnection = (cb: () => void) => {
  connect(DATABASE_URL)
    .then(() => {
      console.log('Database is successfully connected!');
      cb();
    })
    .catch(() => console.error('Unsuccessful connection with database!'));
};
