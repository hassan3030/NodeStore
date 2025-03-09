const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books,authors } = require("./data");
const connectToDb = require("./config/db");
require("dotenv").config();

// Connection To DB
connectToDb();

// Import Books (seeding database)
const importBooks = async () => {
    try {
        await Book.insertMany(books); 
        console.log("Books Imported");
    } catch (error) {
        console.log(error);
        process.exit(1); // close connection 
    }
}

// Import Authors (seeding database)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors); // insertMany function to insert many by mongo
        console.log("Authors Imported");
    } catch (error) {
        console.log(error);
        process.exit(1); // close connection
    }
}

// Remove Books
const removeBooks = async () => {
    try {
        await Book.deleteMany(); // deleteMany  function to delete Many by mongo
        console.log("Books Removed!");
    } catch (error) {
        console.log(error);
        process.exit(1); // close connection 
    }
}

// to run the breviuse functions
// node seeder
// node on index 0
// seeder on index 1
// argv is array contain node seeder
// "-import" on index 2
// "-remove" on index 2
// -import-authors on index 2
// ------ to run -----------
//  node seeder -import
// ------------------ this to all node comands

if(process.argv[2] === "-import") {
    importBooks();
} else if (process.argv[2] === "-remove") {
    removeBooks();
} else if (process.argv[2] === "-import-authors") {
    importAuthors();
}