import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BookCase = (props) => {
	const shelves = [
		{
			id: "currentlyReading",
			title: "Currently Reading",
			books: props.bookShelf.filter(book => book.shelf === "currentlyReading")
		},
		{
			id: "wantToRead",
			title: "Want to Read",
			books: props.bookShelf.filter(book => book.shelf === "wantToRead")
		},
		{
			id: "read",
			title: "Read",
			books: props.bookShelf.filter(book => book.shelf === "read")
		}
	]
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{shelves.filter(shelf => shelf.books.length > 0).map(shelf => (
						<BookShelf key={shelf.id} updateShelf={props.updateBookShelf} books={shelf.books} name={shelf.title} />
					))}
				</div>
			</div>
			<div className="open-search">
				<Link to="/search">Add a book</Link>
			</div>
		</div>
	)
}

BookCase.propTypes = {
	bookShelf: PropTypes.array.isRequired,
	updateBookShelf: PropTypes.func.isRequired
}

export default BookCase