const myLibrary = [];

function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
};

function addBooktoLibrary(title, author, numPages, read) {
    let objBook = new Book(title, author, numPages, read);
    myLibrary.push(objBook);
};

addBooktoLibrary("The Hobbit", "J.R.R. Tolkien", 235, false);
console.log(myLibrary);
