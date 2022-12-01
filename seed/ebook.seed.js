const mongoose = require("mongoose");
const Ebook = require("../models/Ebook.model");
require("dotenv").config();

// ℹ️ Connects to the database
require("../config/dbConfig");

// const timestamp = Date.now();
// const route = "/v1/public/characters";

// const hash = crypto
//   .createHash("md5")
//   .update(
//     `${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
//   )
//   .digest("hex");

const fetchUrl =
  "https://gutendex.com/books/?copyright=false%2Cnull&languages=fr";
let total = null;
let page = 1;

async function seedEbooks() {
  try {
    await Ebook.deleteMany();

    let data = await (await fetch(`${fetchUrl}&page=${page}`)).json();
    total = data.count - data.results.length;
    page++;

    for (const book of data.results) {
      const author = book.authors[0] || {};
      await Ebook.create({ ...book, author });
    }
    //let seed = await Ebook.create(data.results);
    // console.log(data.results);

    //console.log(seed);
    for (let i = total; i > 0; i -= data.results.length) {
      data = await (await fetch(`${fetchUrl}&page=${page}`)).json();
      for (const book of data.results) {
        const author = book.authors[0] || {};
        await Ebook.create({ ...book, author });
      }
      //seed = await Ebook.create(data.results);
      // console.log(seed);
      page++;
    }

    mongoose.disconnect();
  } catch (error) {
    next(error);
  }
}

seedEbooks();
