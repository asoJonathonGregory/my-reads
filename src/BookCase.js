import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const BookCase = (props) => (
	<div className="list-books">
		<div className="list-books-title">
			<h1>MyReads</h1>
		</div>
		<div className="list-books-content">
			<div>
				{props.books.currentlyReading.length > 0 && (
					<BookShelf key="currentlyReading" updateShelf={props.updateBookShelf} books={props.books.currentlyReading} name="Currently Reading" />
				)}
				{props.books.wantToRead.length > 0 && (
					<BookShelf key="wantToRead" updateShelf={props.updateBookShelf} books={props.books.wantToRead} name="Want to Read" />
				)}
				{props.books.read.length > 0 && (
					<BookShelf key="read" updateShelf={props.updateBookShelf} books={props.books.read} name="Read" />
				)}
			</div>
		</div>
		<div className="open-search">
			<Link to="/search">Add a book</Link>
		</div>
	</div>
)
export default BookCase