import dotenv from 'dotenv';

dotenv.load({
  path: (process.env.NODE_ENV === 'test')
    ? '.env.test' : '.env',
});

export default dotenv;
