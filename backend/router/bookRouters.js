import express from 'express';
import { Book } from '../models/bookModels.js';
const router =  express.Router();



// //Test Route
// router.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send("Welcome");
// });

//Publish a Book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        mesaage: "Send all required Field",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.mesaage);
    response.status(500).send({ mesaage: error.mesaage });
  }
});

//Get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.mesaage);
    return response.status(500).send({ message: error.mesaage });
  }
});

//Find book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findById(id);
    return response.status(200).json(books);
  } catch (error) {
    console.log(error.mesaage);
    return response.status(500).send({ message: error.mesaage });
  }
});


// Route for Update a Book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Delete Books
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({
      message: "Book deleted suceesfully",
    });
  } catch (error) {
    console.log(error.mesaage);
    return response.status(500).send({
      message: error.mesaage,
    });
  }
});


export default router;