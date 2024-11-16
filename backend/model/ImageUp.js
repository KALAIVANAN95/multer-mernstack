import mongoose from "mongoose";

const ImageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ImageUp = mongoose.model("Imageup", ImageSchema);

export default ImageUp;
