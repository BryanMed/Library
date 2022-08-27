const bookForm = document.getElementById('book-form');
const bookContainer = document.getElementById('container');

class MyLibrary{
  constructor(){
    this.library = [];
  }
  
  addBook(book){
    this.library.push(book);
  }

  cardTemplate(book, idx) {
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

  createCards() {
    //clear the bookContainer
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.lastChild);
    }
  
    this.library.forEach((book, idx) => {
      this.cardTemplate(book, idx);
    });
  }

  bookSubmit(){
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const book = Object.fromEntries(formData);
    
      let newBook = new Book(book.title, book.author, book.pages, (book.read ? true : false));
      this.addBook(newBook);
      this.createCards();
    });
  }

  bookRenove(){
    bookContainer.addEventListener('click', (e) => {
      if (e.target.className === 'delete-btn') {
        this.library.splice(e.target.parentNode.parentNode.dataset.idx, 1);
        this.createCards();
      }
      else if(e.target.className === 'read-status'){
        this.library[e.target.parentNode.dataset.idx].read = !this.library[e.target.parentNode.dataset.idx].read;
        this.createCards();
      }
    });
  }

}


class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const library = new MyLibrary();
library.bookSubmit();
library.bookRenove();
