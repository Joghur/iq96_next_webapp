import mongoose, {ConnectOptions} from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB is not connected');
    return;
  }

  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: 'next_webapp',
    };
    await mongoose.connect(process.env.MONGODB_URI, options);

    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
