import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@localhost:27017');
  } catch (error) {
    console.error(error);
  }
  return mongoose.connection;
};
