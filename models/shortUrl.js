import mongoose from "mongoose";

const { Schema } = mongoose;

const shortUrlSchema = new Schema({
  redirectFast: { type: Boolean, required: true, default: false },
  shortUrl: { type: String, required: true },
  urlBase: {
    type: String,
    required: true,
  },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.models.shortUrl ||
  mongoose.model("shortUrl", shortUrlSchema);
