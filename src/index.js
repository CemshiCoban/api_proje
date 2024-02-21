import dotenv from 'dotenv';
import runHttpServer from './utils/server-utils/runHttpServer';

dotenv.config({
  path:'src/config/env/config.env',
});

const PORT = process.env.PORT || 5000;

runHttpServer(PORT)
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });