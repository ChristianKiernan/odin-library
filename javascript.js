const myLibrary = [];

function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
};

function addBooktoLibrary(title, author, numPages, read) {
    let objBook = new Book(title, author, numPages, read);
    myLibrary.push(objBook);
};

//Manual book entries for testing
addBooktoLibrary("The Hobbit", "J.R.R. Tolkien", 235, false);
addBooktoLibrary("Harry Potter and the Prisoner of Azkaban", "J.K Rowling", 456, true);
addBooktoLibrary("1984", "George Orwell", 289, true);


function displayOnPage(myLibrary) {
    myLibrary.forEach(book => {
        let table = document.querySelector("tbody");
        let row = document.createElement("tr");
        let cellTitle = document.createElement("td");
        let cellAuthor = document.createElement("td");
        let cellNumPages = document.createElement("td");
        let cellRead = document.createElement("td");

        cellTitle.innerText = `${book.title}`;
        cellAuthor.innerText = `${book.author}`;
        cellNumPages.innerText = `${book.numPages}`;
        cellRead.innerText = `${book.read}`;

        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellNumPages);
        row.appendChild(cellRead);

        table.appendChild(row);
    });
};

//"New book" form logic
let button = document.querySelector("#new-book");
button.addEventListener("click", () => {
    let bookForm = document.querySelector(".hidden");
    if (bookForm.style.display === "none") {
        bookForm.style.display = "block";
    }
    else {
        bookForm.style.display = "none";
    }
});


displayOnPage(myLibrary);