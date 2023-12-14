const myLibrary = [];
const addBookForm = document.querySelector('.addBook');
const cardDiv = document.querySelector('.card');
const dialog = document.querySelector('dialog');
const openDialog = document.querySelector('.open');
const closeDialog = document.querySelector('.close');

let count = 0;

// Book constructor
function Book(title, author, numPages, haveRead, count) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
  this.count = 'count' + count;
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
    count++;
    let myBook = new Book(title, author, numPages, haveRead, count);
    myLibrary.push(myBook);
  }

  displayBook();

  dialog.close();
  addBookForm.reset();
});

function displayBook() {
  const bookContainer = document.querySelector('.book-container');
  // Clear existing content
  bookContainer.innerHTML = '';

  for (const book of myLibrary) {
    const bookCard = document.createElement('div');
    bookCard.className = 'card';

    bookCard.innerHTML = `
      <h3 class='title ${book.count}'>${book.title}</h3>
      <p class='author ${book.count}'>Author: ${book.author}</p>
      <p class='numPages ${book.count}'>Pages: ${book.numPages}</p>
      <p class='haveRead ${book.count}'>Have Read: ${book.haveRead}</p>
      <button class='deleteButton ${
        book.count
      }' onclick="deleteBook('${book.title.replace(/'/g, "\\'")}', '${
      book.count
    }')">Delete</button>
      <button class="toggleButton ${book.count}" onclick="toggleRead('${
      book.haveRead
    }', '${book.title.replace(/'/g, "\\'")}', '${
      book.count
    }')">Update Read</button>

    `;

    bookContainer.appendChild(bookCard);
  }
}

function toggleRead(haveRead, title, count) {
  for (let book of myLibrary) {
    if (title == book.title) {
      if (haveRead == 'Yes') {
        book.haveRead = 'No';
        document.querySelector(`.haveRead.${count}`).textContent =
          'Have Read: No';
      } else if (haveRead == 'No') {
        book.haveRead = 'Yes';
        document.querySelector(`.haveRead.${count}`).textContent =
          'Have Read: Yes';
      }
    }
  }
  displayBook();
  console.log(myLibrary);
}

function deleteBook(bookTitle, count) {
  for (let book of myLibrary) {
    if (bookTitle == book.title) {
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      document.querySelector(`.title.${count}`).remove();
      document.querySelector(`.author.${count}`).remove();
      document.querySelector(`.numPages.${count}`).remove();
      document.querySelector(`.haveRead.${count}`).remove();
      document.querySelector(`.deleteButton.${count}`).remove();
      document.querySelector(`.toggleButton.${count}`).remove();
    }
  }
}

// Form Dialog
openDialog.addEventListener('click', () => {
  dialog.showModal();
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});
