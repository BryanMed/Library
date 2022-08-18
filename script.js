let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book){
  myLibrary.push(book);
}


const zelda = new Book('zelda', 'nintendo', 44, true);

addBookToLibrary(zelda);

console.log(myLibrary);