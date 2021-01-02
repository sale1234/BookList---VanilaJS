function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}
// UI prototypes

// Inserting div before(above) form
UI.prototype.showMessage = function (message, className) {
    const div = document.createElement('div');
    // Give this div a className from function
    div.className = `alert ${className}`;
    // Append text node to this dive
    div.appendChild(document.createTextNode(message));

    // Parent element
    const parentElement = document.querySelector('.container');
    // Get element that i need so i can put div above him
    const ele = document.getElementById('book-form');

    // Remove this div after 3 seconds
    parentElement.insertBefore(div, ele);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

// Adding book to list
UI.prototype.addBook = function (book) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th>${book.isbn}</th>
        <th><a href="#" class="delete">X</th>
    `;

    // append row to book list
    let bookList = document.getElementById('book-list');
    bookList.appendChild(row);
};

// Submitting form, adding book to list
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // haha
    // Creating a book
    const book = new Book(title, author, isbn);

    // Init ui, as UI object
    const ui = new UI();
    // Form validation
    if (title === '' || author === '' || isbn == '') {
        ui.showMessage('You need to enter all fields', 'error');
    } else {
        ui.showMessage('You have succeeded', 'success');
    }

    // Clear all fields after giving information about books
    ui.clearFields();

    // Inserting book into book list
    ui.addBook(book);

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        e.target.parentElement.parentElement.remove();
    }

    // e.preventDefault();
});
