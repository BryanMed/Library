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
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
}


function cardTemplate(book) {
  const card = document.createElement('div');
  card.className = 'card';

  const deleteBook = document.createElement('button');
  const title = document.createElement('p');  
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');

  deleteBook.textContent = 'X'
  title.textContent = book.title;
  author.textContent = `by ${book.author}`;
  pages.textContent = `pages ${book.pages}`;
  read.textContent = book.read;

  card.appendChild(deleteBook);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  bookContainer.appendChild(card);
}

function createCard(e) {
  e.preventDefault();

  //clear the bookContainer
  while(bookContainer.firstChild){
    bookContainer.removeChild(bookContainer.lastChild);
  }

  myLibrary.forEach((book) => {
    cardTemplate(book);
  });
}



bookForm.addEventListener('submit', createCard);
