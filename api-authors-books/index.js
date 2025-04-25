const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/test';
const { authorModel, bookModel } = require('./models');

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await authorModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books"
        }
      }
    ]);
    return res.json({ authors });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/authors', async (req, res) => {
  try {
    const name = req.body?.name;
    const age = req.body?.age;

    if (!name || !age) {
      return res.status(400).json({ message: 'Bad request, name or age not found' });
    }
    const author = new authorModel({
      name,
      age
    });

    const save = await author.save();
    return res.status(201).json({ author: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await bookModel.find({});
    return res.json({ books });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const isbn = req.body?.isbn;
    const name = req.body?.name;
    const cantPages = req.body?.cantPages;
    const author = req.body?.author;

    if (!name || !cantPages || !author || !isbn) {
      return res.status(400).json({ message: 'Bad request, isbn or name or cantPages or author not found' });
    }
    const book = new bookModel({
      isbn,
      name,
      cantPages,
      author
    });

    const save = await book.save();
    return res.status(201).json({ book: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });