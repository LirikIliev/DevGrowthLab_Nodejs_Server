const DB_USER = 'kirilIvailovIliev:';
const DB_PASS = 'dafhasdfl234234.alsdfkj';
const DB_COLLECTION = 'shop-application';

export const DATABASE_MESSAGES = {
  SUCCESS: 'Database is successfully connected!',
  FAIL: 'Unsuccessful connection with database!',
};

export const DATABASE_URL = `mongodb+srv://${DB_USER}${DB_PASS}@cluster0.mhqxh0n.mongodb.net/${DB_COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`;
