const myLibrary = [];
let bookID = 0;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = bookID++;
}

function createCard(Book){
    bookTable = document.getElementById('books-table');
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute('data-id', Book.id); // Set a data attribute to store the book's ID
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() { deleteBook(Book.id); }

    const cardContent = document.createElement("div");

    const card_title = document.createElement("p");
    card_title.textContent = `Title: ${Book.title}`;

    const card_author = document.createElement("p");
    card_author.textContent = `Author: ${Book.author}`;

    const card_pages = document.createElement("p");
    card_pages.textContent = `Pages: ${Book.pages}`;

    const card_status = document.createElement("p");
    card_status.textContent = `Status: ${Book.read}`;

    cardContent.appendChild(deleteBtn);
    cardContent.appendChild(card_title);
    cardContent.appendChild(card_author);
    cardContent.appendChild(card_pages);
    cardContent.appendChild(card_status);

    const readToggle = document.createElement("button");
    readToggle.textContent = Book.read === "Read"? "Unread": "Read";
    readToggle.className = "readToggle";
    readToggle.onclick = function() { toggleReadStatus(Book.id); };
    
    card.appendChild(cardContent)
    card.appendChild(readToggle);
    bookTable.appendChild(card);
    
}

function deleteBook(bookId){
    // Remove the book from the myLibrary array
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) myLibrary.splice(bookIndex, 1);

    // Remove the card from the DOM
    const bookTable = document.getElementById('books-table');
    const cardToDelete = bookTable.querySelector(`[data-id="${bookId}"]`);
    if (cardToDelete) bookTable.removeChild(cardToDelete);
}

function toggleReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book.read === "Unread"){
        book.read = "Read";
    }
    else {
        book.read = "Unread";
    }
    renderLibrary()
}

function renderLibrary() {
    // Clear existing cards
    const bookTable = document.getElementById('books-table');
    bookTable.innerHTML = '';

    // Re-create cards for all books
    myLibrary.forEach(book => createCard(book));
}



document.getElementById('createBook').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData);
    const newBook = new Book(formObj.title, formObj.author, formObj.pages, formObj.read_selection);
    myLibrary.push(newBook);
    //console.log('newBook:', newBook); // Log the form data to the console
    createCard(newBook);

    // Process the form data here (e.g., display it on the page, send it to a server, etc.)
});