const { Schema, model } = require("mongoose");

const ebookSchema = new Schema(
  {
    title: String,
    authors: [
      {
        name: String,
        birth_year: Number,
        death_year: Number,
      },
    ],
    subjects: {
      type: [String],
    },
    formats: {
      type: Object,
    },
    download_count: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ebook = model("Ebook", ebookSchema);

module.exports = Ebook;
