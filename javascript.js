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

Book.prototype.toggle = function () {
    this.read = !this.read;
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
        cellRead.setAttribute("data-read", `${myLibrary[i].id}`);
    
        let updateButton = document.createElement("button");
        updateButton.setAttribute("data-identification", `${myLibrary[i].id}`);
        updateButton.classList.add("update-button");
        updateButton.innerHTML = "Update Status";
        let cellUpdateButton = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-id", `${myLibrary[i].id}`);
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "Delete Book";
        let cellDeleteButton = document.createElement("td");

        cellTitle.innerText = `${myLibrary[i].title}`;
        cellAuthor.innerText = `${myLibrary[i].author}`;
        cellNumPages.innerText = `${myLibrary[i].numPages}`;
        cellRead.innerText = `${myLibrary[i].read}`;
        cellUpdateButton.appendChild(updateButton);
        cellDeleteButton.appendChild(deleteButton);

        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellNumPages);
        row.appendChild(cellRead);
        row.appendChild(cellUpdateButton);
        row.appendChild(cellDeleteButton);

        table.appendChild(row);
    }
    
    //Logic to update "read" status in the library
    let updateBookButtons = document.querySelectorAll(".update-button");
        updateBookButtons.forEach(function (e) {
            e.addEventListener("click", () => {
                let bookToUpdate = e.getAttribute("data-identification");
                let targetBook = myLibrary.find(function(element) {
                    if(element.id === bookToUpdate) {
                        element.toggle();
                        let rowToUpdate= document.querySelector(`[data-read="${bookToUpdate}"]`);
                        if (rowToUpdate.innerHTML !== "false" ) {
                            rowToUpdate.innerHTML = "false";
                        }
                        else {
                            rowToUpdate.innerHTML = "true";
                        }
                    }
                });
            });
        });

    //Logic to remove book from the library array and from the user display
    let removeBookButtons = document.querySelectorAll(".delete-button");
        removeBookButtons.forEach(function (e) {
            e.addEventListener("click", () => {
                let bookToRemove = e.getAttribute("data-id");
                let rowToRemove = document.querySelector(`[data-id="${bookToRemove}"]`);
                rowToRemove.remove();
                let newLibrary = myLibrary.filter(function(element) {
                    return element.id !== bookToRemove;
                myLibrary = newLibrary;
                librarySizeCounter --;
                });
            });
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
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", (e) => { 
    e.preventDefault();

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let numPages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;
   
    if (isNaN(title) && isNaN(author) && !isNaN(numPages)) {
        addBooktoLibrary(title, author, numPages, read);
        displayOnPage(myLibrary);
    }
});

