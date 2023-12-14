/*
All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array.
*/

const myLibrary = [];
const addBookForm = document.querySelector('.addBook');
const cardDiv = document.querySelector('.card');
const dialog = document.querySelector('dialog');
const openDialog = document.querySelector('.open');
const closeDialog = document.querySelector('.close');

// Book constructor
function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = addBookForm.querySelector('.title').value;
  const author = addBookForm.querySelector('.author').value;
  const numPages = addBookForm.querySelector('.numPages').value;
  const haveRead = addBookForm.querySelector('.haveRead').value;

  if (
    title !== null &&
    author !== null &&
    numPages !== null &&
    haveRead !== null
  ) {
    let myBook = new Book(title, author, numPages, haveRead);
    myLibrary.push(myBook);
  }

  displayBook();

  dialog.close();
  addBookForm.reset();
});

/*
Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”.
*/

/*
Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book
*/
function displayBook() {
  const bookContainer = document.querySelector('.book-container');
  // Clear existing content
  bookContainer.innerHTML = '';

  for (const book of myLibrary) {
    const bookCard = document.createElement('div');
    bookCard.className = 'card';

    bookCard.innerHTML = `
      <h3 class='title'>${book.title}</h3>
      <p class='author'>Author: ${book.author}</p>
      <p class='numPages'>Pages: ${book.numPages}</p>
      <p class='haveRead'>Have Read: ${book.haveRead}</p>
    `;

    bookContainer.appendChild(bookCard);
  }
}

// Form Dialog
openDialog.addEventListener('click', () => {
  dialog.showModal();
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});
