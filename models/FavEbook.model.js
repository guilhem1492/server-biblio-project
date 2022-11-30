const { Schema, model } = require("mongoose");

const favEbookSchema = new Schema(
  {
    ebook: {
      type: Schema.Types.ObjectId,
      ref: "Ebook",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const FavEbook = model("FavEbook", favEbookSchema);
module.exports = FavEbook;
