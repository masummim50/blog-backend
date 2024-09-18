import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function bootstrap() {
  console.log('trying to connecto to db, config: ', config);
  await mongoose.connect(config.database_url_online as string);
  console.log('database connected');

  app.listen(5000, async () => {
    console.log(`Server running on port 5000`);
  });
}

bootstrap();
