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

//Dynamic table to display library to the user
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

//"New book" form display logic
let newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", () => {
    let bookForm = document.querySelector(".hidden");
    toggleVisibility(bookForm);
});

function toggleVisibility(element) {
    if (element.style.display !== "block" ) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
};

//"New book" form submission logic
const submitForm = document.querySelector("form");
submitForm.addEventListener("submit", (e) => { 
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numPages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
    console.log(numPages);
    console.log(isNaN(title));
    console.log(isNaN(author));
    console.log(isNaN(numPages));
    
    if (isNaN(title) && isNaN(author) && !isNaN(numPages)) {
        addBooktoLibrary(title, author, numPages, read);
        displayOnPage(myLibrary);
    }
});

