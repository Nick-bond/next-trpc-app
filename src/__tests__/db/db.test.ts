import mongoose from 'mongoose';
import { connectDB } from '@/server/db';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: { readyState: 0 },
}));

describe('Connect to DB', () => {
  const mockedMongoose = mongoose as jest.Mocked<typeof mongoose>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect when not connected', async () => {
    mockedMongoose.connection.readyState = 0;
    mockedMongoose.connect.mockResolvedValueOnce({} as never);

    await connectDB();

    expect(mockedMongoose.connect).toHaveBeenCalledWith(expect.any(String));
  });

  it('should not connect if already connected', async () => {
    mockedMongoose.connection.readyState = 1;

    await connectDB();

    expect(mockedMongoose.connect).not.toHaveBeenCalled();
  });

  it('should throw an error when connection fails', async () => {
    mockedMongoose.connection.readyState = 0;
    const errorMessage = 'Connection error';
    mockedMongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    await expect(connectDB()).rejects.toThrow(`DB connection failed: ${errorMessage}`);
  });
});