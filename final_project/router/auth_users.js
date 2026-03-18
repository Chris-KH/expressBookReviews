const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  // Check if username already exists in users array
  return !users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  // Check if username and password match
  const user = users.find(
    (user) => user.username === username && user.password === password,
  );
  return user !== undefined;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 },
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).json({ message: "User successfully logged in" });
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

  // Find book by ISBN
  let bookKey = Object.keys(books).find((key) => books[key].isbn === isbn);

  if (!bookKey) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add or update review
  if (!books[bookKey].reviews) {
    books[bookKey].reviews = {};
  }

  books[bookKey].reviews[username] = review;

  return res
    .status(200)
    .json({
      message: "Review successfully posted",
      reviews: books[bookKey].reviews,
    });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  // Find book by ISBN
  let bookKey = Object.keys(books).find((key) => books[key].isbn === isbn);

  if (!bookKey) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[bookKey].reviews[username]) {
    return res.status(404).json({ message: "Review not found" });
  }

  delete books[bookKey].reviews[username];

  return res
    .status(200)
    .json({
      message: "Review successfully deleted",
      reviews: books[bookKey].reviews,
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
