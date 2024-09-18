import cors from 'cors';
import express, { Application } from 'express';
import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api/v1',
  // (req, res, next) => {
  //   setTimeout(() => {
  //     next();
  //   }, 1000);
  // },
  // checkreq(),
  routes
);

app.get('/', (req, res) => {
  console.log('trying to access first url');
  res.send({ message: 'to show it works' });
});

//global error handler
app.use(globalErrorHandler);

export default app;
