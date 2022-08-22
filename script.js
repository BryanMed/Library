const bookForm = document.getElementById('book-form');
const bookContainer = document.getElementById('container');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const zelda = new Book('zelda', 'nintendo', 44, true);
addBookToLibrary(zelda);

const mario = new Book('mario', 'nintendo', 12, false);
addBookToLibrary(mario);

const megaman = new Book('megaman', 'sega', 34, false);
addBookToLibrary(megaman);


function bookSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = Object.fromEntries(formData);

  let newBook = new Book(book.title, book.author, book.pages, (book.read ? true : false));
  addBookToLibrary(newBook);
  createCards();
}


function cardTemplate(book, idx) {
  const card = document.createElement('div');
  card.className = 'card';

  const divDelete = document.createElement('div');
  const deleteBook = document.createElement('button');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');

  deleteBook.className = 'delete-btn';
  read.className = 'read-status';
  deleteBook.textContent = '✖'
  title.textContent = book.title;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  read.textContent = book.read ? '🟢 read' : '🔴 not read' ;
  card.dataset.idx = idx;

  divDelete.appendChild(deleteBook);
  card.appendChild(divDelete);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  bookContainer.appendChild(card);
}

function createCards() {
  //clear the bookContainer
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.lastChild);
  }

  myLibrary.forEach((book, idx) => {
    cardTemplate(book, idx);
  });
}

bookForm.addEventListener('submit', bookSubmit);

bookContainer.addEventListener('click', (e) => {
  if (e.target.className === 'delete-btn') {
    myLibrary.splice(e.target.parentNode.parentNode.dataset.idx, 1);
    createCards();
  }
  else if(e.target.className === 'read-status'){
    myLibrary[e.target.parentNode.dataset.idx].read = !myLibrary[e.target.parentNode.dataset.idx].read;
    createCards();
  }
})




