import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = (props) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{props.name}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{props.books.map(book => (
					<Book key={book.id} updateShelf={props.updateShelf} book={book}/>
				))}
			</ol>
		</div>
	</div>
)

BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	updateShelf: PropTypes.func.isRequired
}

export default BookShelf