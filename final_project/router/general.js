const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({
    username: username,
    password: password,
  });

  return res
    .status(201)
    .json({ message: "User successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    // Using async/await with axios to get books
    const booksArray = Object.values(books);
    return res.status(200).json(booksArray);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    const isbn = req.params.isbn;

    // Using async and filter to find book by ISBN
    const book = await Promise.resolve(
      Object.values(books).find((b) => b.isbn === isbn),
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  try {
    const author = req.params.author;

    // Using async/await to filter books by author
    const booksByAuthor = await Promise.resolve(
      Object.values(books).filter(
        (b) => b.author.toLowerCase() === author.toLowerCase(),
      ),
    );

    if (booksByAuthor.length === 0) {
      return res.status(404).json({ message: "No books found by this author" });
    }

    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  try {
    const title = req.params.title;

    // Using async/await to filter books by title
    const booksByTitle = await Promise.resolve(
      Object.values(books).filter(
        (b) => b.title.toLowerCase() === title.toLowerCase(),
      ),
    );

    if (booksByTitle.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found with this title" });
    }

    return res.status(200).json(booksByTitle);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  try {
    const isbn = req.params.isbn;

    // Using async/await to find and return reviews
    const book = await Promise.resolve(
      Object.values(books).find((b) => b.isbn === isbn),
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book.reviews);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving reviews" });
  }
});

module.exports.general = public_users;
