class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook(book) {
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
    }

    // Clearing fields in book list
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showMessage(message, className) {
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
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// Submitting form, adding book to list
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Creating a book
    const book = new Book(title, author, isbn);

    // Init ui, as UI object
    const ui = new UI();
    // Form validation

    if (title === '' || author === '' || isbn === '') {
        ui.showMessage('You need to enter all fields', 'error');
        ui.clearFields();

        return;
    } else if (isNaN(isbn)) {
        ui.showMessage(
            'You need to fill ISBN field with number not a letter',
            'error'
        );

        return;
    } else {
        ui.showMessage('You have succeeded', 'success');
    }

    // Clear all fields after giving information about books
    ui.clearFields();

    // Delete book
    ui.deleteBook(e.target);

    // Inserting book into book list
    ui.addBook(book);

    // Add book to local storage so it stays even after I reload the page
    Storage.addBookToLocalStorage(book);

    e.preventDefault();
});

// Event listener for deleting book
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();

    // Delete book from list
    ui.deleteBook(e.target);
    // Delete book from local storage, using isbn of book!
    Storage.removeBook(
        e.target.parentElement.previousElementSibling.textContent
    );

    e.preventDefault();
});

// Local Storage Class
class Storage {
    // Get a book from local storage
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Storage.getBook();

        books.forEach((book) => {
            // initialing this object so i can call function add book to list
            const ui = new UI();
            ui.addBook(book);
        });
    }

    static addBookToLocalStorage(book) {
        // Daj mi sve knige koje imam/nemam u LS
        const books = Storage.getBook();

        // Na te knjige da dodamo ovu novu
        books.push(book);
        // Refresuj LS sa novim knjigama
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBook();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        // Refresh local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM LoadEvent
document.addEventListener('DOMContentLoaded', Storage.displayBooks);
