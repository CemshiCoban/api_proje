import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import http from 'http';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import address from 'address';
import routes from '../../route';
//import customErrorHandler from '../../api/middlewares/express/customErrorHandler';


export default (PORT) => new Promise((resolve, reject) => {
  try {
    const app = express();
    const server = http.createServer(app);
    
    app.use(logger('dev'));
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use('/configuration', routes);

    // error handler
    //app.use(customErrorHandler);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    if (process.env.NODE_ENV !== 'test') {
      server.listen(PORT, () => {
        console.log(`${process.env.SERVICE_NAME} service started.`.yellow);
        console.log('---------------------------------------------'.yellow);
        console.log(`Local: http://localhost:${PORT}`.yellow);
        console.log(`On your network: http://${address.ip()}:${PORT}`.yellow);
        console.log('---------------------------------------------'.yellow);
        resolve(server);
      });
    }
  } catch (error) {
    reject(error);
  }
});