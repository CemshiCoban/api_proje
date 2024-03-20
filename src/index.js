import dotenv from 'dotenv';
import runDatabase from './server/runDatabase.js';
import runHttpServer from './server/runHttpServer.js'

dotenv.config();

const PORT = process.env.PORT || 3000;

runHttpServer(PORT)
  .then(() => runDatabase())
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });