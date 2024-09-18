import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // console.log('running catch asynch: ');
    // const allowedOrigins = [
    //   'https://capable-croissant-486a0f.netlify.app',
    //   'http://localhost:3000',
    // ];
    // const origin = req.headers.origin as string;
    // console.log('origin found in req.headers: ', origin);
    // if (allowedOrigins.includes(origin)) {
    //   console.log('setting headers for allowed origin');
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    // res.setHeader(
    //   'Access-Control-Allow-Methods',
    //   'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    // );
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    // // Set specific allowed headers
    // res.setHeader('Access-Control-Allow-Headers', 'Authorization');

    // console.log('response object: ', res);

    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
