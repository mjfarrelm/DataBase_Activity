require("dotenv").config();
require("./db/connection");

const Book = require("./models/bookmodel")
const express = require("express")
const app = express()

app.use(express.json())

app.post("/books/addbook", async (req, res) => {
    console.log("Req Body:",req.body)


const result = await Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre
})

const successResponse = {
    message: "Book successfull added",
    dbresponse: result
}

res.status(201).send(successResponse);
})
const port = process.env.PORT

app.get("/books/listbooks", async (req, res) => {
   const listOfBooks = await Book.find({});

    const successResponse = {
        message: "List of Books is as follows: ",
        books: listOfBooks
    };
    res.status(200).send(successResponse);
})

app.put("/books/updateBook", async (req, res) => {
   
    const updateBook = await Book.findOneAndUpdate({title: req.body.title},{author: req.body.author}, {new: true})
    console.log(updateBook);
    
    if(updateBook !== null){
    const  updateResponse = {
        message: "Book entry updated!",
        books: updateBook

    };
    res.status(200).send(updateResponse)
} else {
    res.status(400).send("Something went wrong!")
}
})

app.delete("/books/deleteBook", async (req, res) => {
    const deleteBook = await Book.deleteOne({title: req.body.title});
    
    console.log(deleteBook)
    if(deleteBook.deletedCount === 1){
    const deleteConfirm = {
        message: "Book succesfully deleted",
        books: deleteBook
     
    }
    res.status(200).send(deleteConfirm)
} else {
    res.status(400).send("Book not found")
}
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))