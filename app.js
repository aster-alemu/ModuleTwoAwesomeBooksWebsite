class Book {
  constructor (title, author) {
    this.title = title;
    this.author = author;
  }
}

//Handle UI task

class UI {
  static displayBooks () {
    
    const books =Store.getBooks();
  }
 static addBookToList(book) {
   const list = document.querySelector('.table');
   const row = document.createElement('tr');
   const title = document.querySelector('#title');
   const author = document.querySelector('#author');
   const tableData = document.createElement('td');
   tableData.classList.add('titleList');
   row.appendChild(tableData);
   tableData.innerHTML = title.value;
   const tableDataTwo = document.createElement('td');
   tableDataTwo.classList.add('authorList');
   row.appendChild(tableDataTwo);
   tableDataTwo.innerHTML = author.value;
   const tableDataThree = document.createElement('td');
   tableDataThree.classList.add('delete');
   row.appendChild(tableDataThree);
   tableDataThree.innerHTML = 'Remove';
   list.appendChild(row);
 }

 static deleteBook(el) {
   if (el.classList.contains('delete')) {
     el.parentElement.remove();
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
// books.push(book);

localStorage.setItem('books', JSON.stringify(books));
}
}

//event display book
document.addEventListener('DOMContentloaded', UI.displayBooks());
//Event Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Prevent actual submit
  e.preventDefault();
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