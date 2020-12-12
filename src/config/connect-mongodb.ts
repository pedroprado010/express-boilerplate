import { connect } from 'mongoose';

export default async function connectMongodb(): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGO_URI env variable');
  }
  await connect(process.env.MONGODB_URI, { autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
}
