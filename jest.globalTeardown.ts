import mongoose from 'mongoose';
import { mongoServer } from './jest.globalSetup';

export default async function globalTeardown() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}
