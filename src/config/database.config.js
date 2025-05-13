import { connect } from 'mongoose';
import { config } from "./index.js";

export const connectDb = async () => {
    await connect(config.MONGO_URL)
}