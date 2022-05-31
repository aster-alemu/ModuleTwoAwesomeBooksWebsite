class Book {
  constructor (title, author) {
    this.title = title;
    this.author = author;
  }
}

//Handle UI task

class UI {
  static displayBooks () {
    // const StoredBooks = [
    //   {
    //     title : "book one",
    //     author : 'xxx',
    //   },
    //   {
    //     title : "book one",
    //     author : 'xxx',
    //   },
    // ];
    const books =Store.getBooks();
    books.forEach ((book) => UI.addBookToList(book));
  }
 static addBookToList(book) {
   const list = document.querySelector('.table');
   const row = document.createElement('tr');
   row.innerHTML = 
   "<td>${book.title}</td><td>${book.author}</td><td><a href='#' class='delete'>X</a></td>";
   list.appendChild(row);
 }

 static deleteBook(el) {
   if (el.classList.contains('delete')) {
     el.parentElement.parentElement.remove();
   }
 }
 static clearFields() {
   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';

 }
}

//Store class: Handle storage
class Store {
static getBooks () {
  let books
  if (localStorage.getItem('books')=== null) {
    books=[];
  }
  else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}
static addBook(book)
{
const books = Store.getBooks();
books.push(book);

localStorage.setItem('books', JSON.stringify(book));
}
}

//event display book
document.addEventListener('DOMContentloaded', UI.displayBooks());
//Event Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Prevent actual submit
  e.preventDefault();

  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  //Instatiate book
  const book = new Book (title, author);
  //Add book to UI
  UI.addBookToList(book);
  //Add book to store
  Store.addBook(book)
  //clear fields
  UI.clearFields();
});

//Event: remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});