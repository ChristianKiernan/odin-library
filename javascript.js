//Global variables
let myLibrary = [];
let librarySizeCounter = myLibrary.length;


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
    librarySizeCounter += 1;
};

//Dynamic table to display library to the user
function displayOnPage(myLibrary) {
    for (let i = librarySizeCounter - 1; i < librarySizeCounter; i++) {
        let table = document.querySelector("tbody");

        let row = document.createElement("tr");
        row.setAttribute("data-id", `${myLibrary[i].id}`);

        let cellTitle = document.createElement("td");
        let cellAuthor = document.createElement("td");
        let cellNumPages = document.createElement("td");
        let cellRead = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-id", `${myLibrary[i].id}`);
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "Delete Book";

        cellTitle.innerText = `${myLibrary[i].title}`;
        cellAuthor.innerText = `${myLibrary[i].author}`;
        cellNumPages.innerText = `${myLibrary[i].numPages}`;
        cellRead.innerText = `${myLibrary[i].read}`;

        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellNumPages);
        row.appendChild(cellRead);
        row.appendChild(deleteButton);

        table.appendChild(row);
    }

    //Logic to remove book from the library array
    const removeBookButton = document.querySelector(".delete-button");
        removeBookButton.addEventListener("click", () => {
            let bookToRemove = removeBookButton.getAttribute("data-id");
            let newLibrary = myLibrary.filter(function(element) {
                return element.id !== bookToRemove;
            });
            myLibrary = newLibrary;
            librarySizeCounter --;
    });
};

//"New book" form display logic
let newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", () => {
    let bookForm = document.querySelector(".hidden");
    toggleVisibility(bookForm);
});

//Change visibility of popup form
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
   
    if (isNaN(title) && isNaN(author) && !isNaN(numPages)) {
        addBooktoLibrary(title, author, numPages, read);
        displayOnPage(myLibrary);
    }
});

// Button logic to allow user to change "read" status for a book
// const readStatusButton = document.querySelector("read-status");
// readStatusButton.addEventListener("click", () => {
//     console.log("This is a test");
// });

//Button logic to allow user to remove a book from the library
// const removeBookButton = document.querySelector("delete-button");
// removeBookButton.addEventListener("click", () => {
//     let bookToRemove = removeBookButton.id;
//     let newLibrary = myLibrary.filter(item => item.id !== bookToRemove);
//     myLibrary = newLibrary;
//     console.log(myLibrary);
    
    //document.querySelector(`row[data-id = ${bookToRemove}]`);

// });

